import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaClient as MasterClient } from '../../prisma/generated/master';
import { PrismaClient } from '@prisma/client';
import { PayPalService } from '../paypal/paypal.service';
import { EmailService } from '../email/email.service';
import { TenantsService } from '../tenants/tenants.service';
import * as bcrypt from 'bcrypt';

const PLAN_PRICES: Record<string, number> = {
    starter: 49,
    premium: 129,
    elite: 299,
};

const LINK_EXPIRY_HOURS = 24;

const PAYPAL_PLAN_IDS: Record<string, string> = {
    starter: process.env.PAYPAL_STARTER_PLAN_ID || 'P-PLACEHOLDER_STARTER',
    premium: process.env.PAYPAL_PREMIUM_PLAN_ID || 'P-PLACEHOLDER_PREMIUM',
    elite: process.env.PAYPAL_ELITE_PLAN_ID || 'P-PLACEHOLDER_ELITE',
};

@Injectable()
export class RegistrationsService {
    private readonly logger = new Logger(RegistrationsService.name);
    private masterClient: MasterClient;

    constructor(
        private paypalService: PayPalService,
        private emailService: EmailService,
        private tenantsService: TenantsService,
    ) {
        this.masterClient = new MasterClient({
            datasources: { db: { url: process.env.MASTER_DATABASE_URL } },
        });
    }

    async createPendingRegistration(data: {
        name: string;
        email: string;
        password: string;
        organizationName: string;
        location?: string;
        plan: string;
        logoUrl?: string;
    }) {
        this.logger.log(`Starting registration for ${data.email}. Payload: ${JSON.stringify({ ...data, password: '***' })}`);

        // Validate plan
        const plan = data.plan || 'starter';
        const amount = PLAN_PRICES[plan];
        if (!amount) {
            this.logger.error(`Invalid plan requested: ${plan}`);
            throw new BadRequestException(`Plan inválido: ${plan}`);
        }

        // Check if email already has a pending registration
        this.logger.log(`Checking for existing pending registration: ${data.email}`);
        const existing = await this.masterClient.pendingRegistration.findFirst({
            where: {
                email: data.email,
                status: 'PENDING',
                expiresAt: { gt: new Date() },
            },
        });

        if (existing) {
            this.logger.warn(`Existing pending registration found for ${data.email}`);
            throw new BadRequestException(
                'Ya existe un registro pendiente para este email. Revisa tu bandeja de entrada o espera a que expire el enlace anterior.',
            );
        }

        // Hash password
        this.logger.log(`Hashing password for ${data.email}`);
        const passwordHash = await bcrypt.hash(data.password, 10);

        // Create pending registration
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + LINK_EXPIRY_HOURS);

        this.logger.log(`Creating pending registration record for ${data.email}`);
        const pending = await this.masterClient.pendingRegistration.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash,
                organizationName: data.organizationName,
                location: data.location,
                plan,
                logoUrl: data.logoUrl,
                amount,
                expiresAt,
                status: 'PENDING',
            },
        });

        this.logger.log(`Pending registration created: ${pending.id} for ${data.email}`);

        // Create PayPal subscription
        try {
            this.logger.log(`Creating PayPal subscription for ${pending.id} (Plan: ${plan})`);

            const paypalPlanId = PAYPAL_PLAN_IDS[plan];
            if (!paypalPlanId || paypalPlanId.includes('PLACEHOLDER')) {
                throw new Error(`PayPal Plan ID not configured for tier: ${plan}. Please check your .env file.`);
            }

            const subscription = await this.paypalService.createSubscription(paypalPlanId, pending.id);
            this.logger.log(`PayPal subscription created: ${subscription.id}`);

            const approvalLink = subscription.links.find(l => l.rel === 'approve')?.href;

            // Update pending registration with PayPal details
            await this.masterClient.pendingRegistration.update({
                where: { id: pending.id },
                data: {
                    paypalSubscriptionId: subscription.id,
                    paymentLink: approvalLink,
                },
            });

            // Send payment email
            if (approvalLink) {
                this.logger.log(`Sending payment email to ${data.email}`);
                await this.emailService.sendPaymentLink(
                    data.email,
                    data.name,
                    approvalLink,
                    plan,
                    amount,
                    expiresAt,
                );
                this.logger.log(`Payment email sent successfully to ${data.email}`);
            }

            return {
                id: pending.id,
                status: 'PENDING',
                message: 'Se ha enviado un enlace de suscripción a tu correo electrónico.',
                expiresAt,
            };
        } catch (error) {
            this.logger.error(`Subscription creation failed: ${error.message}`, error.stack);
            if (pending) {
                await this.masterClient.pendingRegistration.update({
                    where: { id: pending.id },
                    data: { status: 'CANCELLED' },
                }).catch(e => this.logger.error(`Failed to cancel registration ${pending.id}: ${e.message}`));
            }
            throw new BadRequestException(error.message || 'Error al procesar la suscripción. Intenta nuevamente.');
        }
    }

    async confirmPayment(registrationId: string, paypalToken: string) {
        this.logger.log(`Confirming payment for registration: ${registrationId}`);

        const pending = await this.masterClient.pendingRegistration.findUnique({
            where: { id: registrationId },
        });

        if (!pending) {
            this.logger.error(`Registration not found: ${registrationId}`);
            throw new NotFoundException('Registro no encontrado.');
        }

        // --- IDEMPOTENCY CHECK ---
        if (pending.status === 'PAID') {
            this.logger.log(`Registration ${registrationId} is already marked as PAID. Checking if tenant exists.`);
            const tenant = await this.masterClient.tenant.findFirst({
                where: { adminEmail: pending.email }
            });
            return {
                success: true,
                tenantId: tenant?.id,
                message: '¡Tu cuenta ya ha sido activada!',
            };
        }

        if (pending.status !== 'PENDING') {
            this.logger.warn(`Invalid registration status for confirmation: ${pending.status}`);
            throw new BadRequestException(`Este registro no se puede procesar (estado: ${pending.status}).`);
        }

        if (new Date() > pending.expiresAt) {
            this.logger.warn(`Registration link expired for ${registrationId}`);
            await this.masterClient.pendingRegistration.update({
                where: { id: pending.id },
                data: { status: 'EXPIRED' },
            });
            throw new BadRequestException('El enlace de pago ha expirado. Por favor, registra tu cuenta nuevamente.');
        }

        // --- PAYPAL SUBSCRIPTION VERIFICATION ---
        let subscriptionDetails: any;
        const verifiedSubscriptionId = pending.paypalSubscriptionId || paypalToken;

        try {
            this.logger.log(`Verifying subscription ${verifiedSubscriptionId} for registration ${registrationId}`);
            subscriptionDetails = await this.paypalService.getSubscriptionDetails(verifiedSubscriptionId);
        } catch (error) {
            this.logger.error(`Subscription verification failed: ${error.message}`);
            throw new BadRequestException('Error al verificar la suscripción con PayPal. Verifica tu cuenta o intenta más tarde.');
        }

        if (subscriptionDetails.status !== 'ACTIVE' && subscriptionDetails.status !== 'APPROVED') {
            this.logger.error(`PayPal subscription status is not valid for activation: ${subscriptionDetails.status}`);
            throw new BadRequestException(`La suscripción no está activa aún (Estado: ${subscriptionDetails.status}).`);
        }

        // --- FINALIZATION ---
        this.logger.log(`Finalizing account creation for ${pending.email}`);

        // Update status immediately (atomic-ish)
        await this.masterClient.pendingRegistration.update({
            where: { id: pending.id },
            data: {
                status: 'PAID',
                paypalSubscriptionId: verifiedSubscriptionId // Store it if it was missing
            },
        });

        // 1. Create/Find Tenant
        let tenant = await this.masterClient.tenant.findUnique({
            where: { adminEmail: pending.email }
        });

        if (!tenant) {
            const subdomain = pending.organizationName.toLowerCase().replace(/[^a-z0-9]/g, '');
            tenant = await this.tenantsService.createTenant({
                name: pending.organizationName,
                subdomain: `${subdomain}-${Math.random().toString(36).substring(7)}`,
                dbUrl: process.env.DATABASE_URL || 'file:./dev.db',
                plan: pending.plan,
                adminEmail: pending.email,
                location: pending.location || undefined,
                logoUrl: pending.logoUrl || undefined,
            });
            this.logger.log(`Tenant created: ${tenant.id} for ${pending.organizationName}`);
        }

        // 2. Create Subscription Record in DB
        const now = new Date();
        const periodEnd = new Date(now);
        periodEnd.setMonth(periodEnd.getMonth() + 1);

        const existingSub = await this.masterClient.subscription.findFirst({
            where: { tenantId: tenant.id }
        });

        if (!existingSub) {
            await this.masterClient.subscription.create({
                data: {
                    tenantId: tenant.id,
                    plan: pending.plan,
                    amount: pending.amount,
                    status: 'ACTIVE',
                    paypalSubscriptionId: verifiedSubscriptionId,
                    currentPeriodStart: now,
                    currentPeriodEnd: periodEnd,
                },
            });
        }

        // 3. Create Invoice Record
        const paypalPaymentId = verifiedSubscriptionId;
        const existingInvoice = await this.masterClient.invoice.findFirst({
            where: { tenantId: tenant.id, totalAmount: pending.amount }
        });

        if (!existingInvoice) {
            await this.masterClient.invoice.create({
                data: {
                    tenantId: tenant.id,
                    amount: pending.amount,
                    overageAmount: 0,
                    totalAmount: pending.amount,
                    status: 'PAID',
                    paypalPaymentId,
                    billingPeriodStart: now,
                    billingPeriodEnd: periodEnd,
                    details: { type: 'initial_payment', plan: pending.plan },
                },
            });
        }

        // 4. Create Admin User in Tenant Database
        this.logger.log(`Initializing tenant database connection for ${tenant.id}`);
        // Use the default generator but with a specific URL
        const tenantDb = new PrismaClient({
            datasources: { db: { url: tenant.dbUrl } },
        });

        try {
            await tenantDb.$connect();
            const existingUser = await tenantDb.user.findUnique({
                where: { email: pending.email }
            });

            if (!existingUser) {
                const user = await tenantDb.user.create({
                    data: {
                        email: pending.email,
                        password: pending.passwordHash,
                        name: pending.name,
                        role: 'ADMIN',
                    },
                });
                this.logger.log(`Admin user created: ${user.id} in tenant ${tenant.id}`);

                // Sync to Global User Map
                try {
                    await this.tenantsService.upsertGlobalUser({
                        email: pending.email,
                        tenantId: tenant.id,
                        role: 'ADMIN'
                    });
                    this.logger.log(`Admin user ${pending.email} registered in GlobalUserMap`);
                } catch (error) {
                    this.logger.error(`Failed to register ${pending.email} in GlobalUserMap: ${error.message}`);
                }
            }
        } catch (dbError) {
            this.logger.error(`Error during tenant DB initialization: ${dbError.message}`);
        } finally {
            await tenantDb.$disconnect();
        }

        // 5. Send welcome email
        try {
            await this.emailService.sendWelcome(pending.email, pending.name, pending.plan);
            this.logger.log(`Welcome email sent to ${pending.email}`);
        } catch (emailError) {
            this.logger.error(`Failed to send welcome email: ${emailError.message}`);
        }

        return {
            success: true,
            tenantId: tenant.id,
            message: '¡Cuenta creada exitosamente! Ya puedes iniciar sesión.',
        };
    }

    async getRegistrationStatus(registrationId: string) {
        const pending = await this.masterClient.pendingRegistration.findUnique({
            where: { id: registrationId },
        });

        if (!pending) {
            throw new NotFoundException('Registro no encontrado.');
        }

        // Check if expired
        if (pending.status === 'PENDING' && new Date() > pending.expiresAt) {
            await this.masterClient.pendingRegistration.update({
                where: { id: pending.id },
                data: { status: 'EXPIRED' },
            });
            return { status: 'EXPIRED' };
        }

        return { status: pending.status };
    }

    async findByPaypalOrderId(paypalOrderId: string) {
        return this.masterClient.pendingRegistration.findFirst({
            where: { paypalOrderId },
        });
    }

    async updateSubscriptionStatus(paypalSubscriptionId: string, status: string) {
        this.logger.log(`Updating subscription status via webhook: ${paypalSubscriptionId} -> ${status}`);
        try {
            await this.masterClient.subscription.updateMany({
                where: { paypalSubscriptionId },
                data: { status: status.toUpperCase() as any },
            });
        } catch (error) {
            this.logger.error(`Failed to update subscription status for ${paypalSubscriptionId}: ${error.message}`);
        }
    }

    async syncSubscriptionPlan(paypalSubscriptionId: string, paypalPlanId: string) {
        this.logger.log(`Syncing subscription plan for ${paypalSubscriptionId} with PayPal plan ${paypalPlanId}`);

        // Find the internal plan name
        let targetPlan: string | null = null;
        for (const [name, id] of Object.entries(PAYPAL_PLAN_IDS)) {
            if (id === paypalPlanId) {
                targetPlan = name;
                break;
            }
        }

        if (!targetPlan) {
            this.logger.warn(`Could not map PayPal Plan ID ${paypalPlanId} to an internal plan name.`);
            return;
        }

        const amount = PLAN_PRICES[targetPlan];

        try {
            // Update Subscription record
            const subscription = await this.masterClient.subscription.findFirst({
                where: { paypalSubscriptionId },
            });

            if (subscription && subscription.plan.toLowerCase() !== targetPlan) {
                this.logger.log(`Subscription ${subscription.id} plan mismatch. Updating database from ${subscription.plan} to ${targetPlan}`);

                await this.masterClient.subscription.update({
                    where: { id: subscription.id },
                    data: { plan: targetPlan, amount },
                });

                // Update Tenant record
                await this.masterClient.tenant.update({
                    where: { id: subscription.tenantId },
                    data: { plan: targetPlan },
                });

                this.logger.log(`Tenant ${subscription.tenantId} successfully updated to plan ${targetPlan}`);
            }
        } catch (error) {
            this.logger.error(`Failed to sync subscription plan for ${paypalSubscriptionId}: ${error.message}`);
        }
    }
}
