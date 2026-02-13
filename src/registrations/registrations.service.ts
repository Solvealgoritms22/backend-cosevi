import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaClient as MasterClient } from '../../prisma/generated/master';
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

        // Create PayPal order
        try {
            this.logger.log(`Creating PayPal order for ${pending.id} (Plan: ${plan}, Amount: ${amount})`);
            const order = await this.paypalService.createOrder(plan, amount, pending.id);
            this.logger.log(`PayPal order created: ${order.id}`);

            const approvalLink = order.links.find(l => l.rel === 'approve')?.href;

            // Update pending registration with PayPal details
            await this.masterClient.pendingRegistration.update({
                where: { id: pending.id },
                data: {
                    paypalOrderId: order.id,
                    paymentLink: approvalLink,
                },
            });

            // Send payment email
            if (approvalLink) {
                this.logger.log(`Sending payment email to ${data.email}`);
                // Non-blocking email send to prevent registration timeout
                this.emailService.sendPaymentLink(
                    data.email,
                    data.name,
                    approvalLink,
                    plan,
                    amount,
                    expiresAt,
                ).catch(err => {
                    this.logger.error(`Failed to send payment email to ${data.email}: ${err.message}`, err.stack);
                });
                this.logger.log(`Payment email queued for ${data.email}`);
            } else {
                this.logger.warn(`No approval link found in PayPal order for ${pending.id}`);
            }

            return {
                id: pending.id,
                status: 'PENDING',
                message: 'Se ha enviado un enlace de pago a tu correo electrónico.',
                expiresAt,
            };
        } catch (error) {
            this.logger.error(`Registration failed: ${error.message}`, error.stack);
            if (pending) {
                // If PayPal fails, mark registration as cancelled
                await this.masterClient.pendingRegistration.update({
                    where: { id: pending.id },
                    data: { status: 'CANCELLED' },
                }).catch(e => this.logger.error(`Failed to cancel registration ${pending.id}: ${e.message}`));
            }
            throw new BadRequestException(error.message || 'Error al procesar el registro. Intenta nuevamente.');
        }
    }

    async confirmPayment(registrationId: string, paypalToken: string) {
        const pending = await this.masterClient.pendingRegistration.findUnique({
            where: { id: registrationId },
        });

        if (!pending) {
            throw new NotFoundException('Registro no encontrado.');
        }

        if (pending.status !== 'PENDING') {
            throw new BadRequestException(`Este registro ya fue procesado (estado: ${pending.status}).`);
        }

        if (new Date() > pending.expiresAt) {
            await this.masterClient.pendingRegistration.update({
                where: { id: pending.id },
                data: { status: 'EXPIRED' },
            });
            throw new BadRequestException('El enlace de pago ha expirado. Por favor, registra tu cuenta nuevamente.');
        }

        // Capture the PayPal payment
        let captureResult: any;
        try {
            captureResult = await this.paypalService.captureOrder(pending.paypalOrderId!);
        } catch (error) {
            this.logger.error(`Payment capture failed: ${error.message}`);
            throw new BadRequestException('Error al procesar el pago. Contacta a soporte.');
        }

        if (captureResult.status !== 'COMPLETED') {
            throw new BadRequestException(`Pago no completado. Estado: ${captureResult.status}`);
        }

        // Mark registration as paid
        await this.masterClient.pendingRegistration.update({
            where: { id: pending.id },
            data: { status: 'PAID' },
        });

        // Create tenant
        const subdomain = pending.organizationName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const tenant = await this.tenantsService.createTenant({
            name: pending.organizationName,
            subdomain: `${subdomain}-${Math.random().toString(36).substring(7)}`,
            dbUrl: process.env.DATABASE_URL || 'file:./dev.db',
            plan: pending.plan,
            location: pending.location || undefined,
            logoUrl: pending.logoUrl || undefined,
        });

        this.logger.log(`Tenant created: ${tenant.id} for ${pending.organizationName}`);

        // Create subscription record
        const now = new Date();
        const periodEnd = new Date(now);
        periodEnd.setMonth(periodEnd.getMonth() + 1);

        await this.masterClient.subscription.create({
            data: {
                tenantId: tenant.id,
                plan: pending.plan,
                amount: pending.amount,
                status: 'ACTIVE',
                currentPeriodStart: now,
                currentPeriodEnd: periodEnd,
            },
        });

        // Create initial invoice
        const paypalPaymentId = captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.id;

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

        // Create the admin user using PrismaService approach
        // We need to use the tenant's DB directly
        const { PrismaClient } = require('@prisma/client');
        const tenantDb = new PrismaClient({
            datasources: { db: { url: tenant.dbUrl } },
        });

        try {
            await tenantDb.$connect();
            const user = await tenantDb.user.create({
                data: {
                    email: pending.email,
                    password: pending.passwordHash,
                    name: pending.name,
                    role: 'ADMIN',
                },
            });
            this.logger.log(`Admin user created: ${user.id} in tenant ${tenant.id}`);
        } finally {
            await tenantDb.$disconnect();
        }

        // Send welcome email
        await this.emailService.sendWelcome(pending.email, pending.name, pending.plan);

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
}
