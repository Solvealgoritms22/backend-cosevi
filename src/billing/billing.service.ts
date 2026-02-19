import { Injectable, Logger, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaClient as MasterClient } from '../../prisma/generated/master';
import { PrismaService } from '../prisma.service';
import { TenantsService } from '../tenants/tenants.service';
import { PLAN_LIMITS } from '../auth/guards/plan.guard';
import { PayPalService } from '../paypal/paypal.service';
import { RegistrationsService } from '../registrations/registrations.service';

const PLAN_PRICES: Record<string, number> = {
    starter: 49,
    premium: 129,
    elite: 299,
};

const OVERAGE_RATES: Record<string, number> = {
    units: 0.25,
    parking: 0.10,
    monitors: 1.00,
    security: 0.50,
    visits: 0.01,
    alerts: 0.02,
    reports: 0.05,
};

// Use a shared client to avoid connection leaks in request-scoped service
const masterClient = new MasterClient({
    datasources: { db: { url: process.env.MASTER_DATABASE_URL } },
});

@Injectable()
export class BillingService {
    private readonly logger = new Logger(BillingService.name);
    private masterClient = masterClient;

    constructor(
        private prisma: PrismaService,
        private tenantsService: TenantsService,
        private paypalService: PayPalService,
        private registrationsService: RegistrationsService,
        @Inject(REQUEST) private request: Request,
    ) { }

    private getTenantId(): string {
        return this.request.headers['x-tenant-id'] as string;
    }

    async getCurrentUsage() {
        const tenantId = this.getTenantId();
        if (!tenantId) return null;

        const tenant = await this.tenantsService.getTenantById(tenantId);
        if (!tenant) return null;

        const plan = tenant.plan || 'starter';
        const limits = PLAN_LIMITS[plan] || PLAN_LIMITS['starter'];

        // Get current counts
        const now = new Date();
        const periodStart = new Date(now.getFullYear(), now.getMonth(), 1); // First day of current month

        const [units, parking, monitors, security, visits, alerts, reports] = await Promise.all([
            this.prisma.residentProfile.count(),
            this.prisma.space.count(),
            this.prisma.user.count({ where: { role: 'ADMIN' } }),
            this.prisma.user.count({ where: { role: 'SECURITY' } }),
            this.prisma.visit.count({ where: { createdAt: { gte: periodStart } } }),
            this.prisma.emergencyAlert.count({ where: { createdAt: { gte: periodStart } } }),
            this.prisma.incidentReport.count({ where: { createdAt: { gte: periodStart } } }),
        ]);

        const resources = {
            units: {
                current: units,
                limit: limits.units,
                extra: Math.max(0, units - limits.units),
                overageCost: Math.max(0, units - limits.units) * OVERAGE_RATES.units,
                rate: OVERAGE_RATES.units,
                percentage: limits.units === Infinity ? 0 : Math.round((units / limits.units) * 100),
            },
            parking: {
                current: parking,
                limit: limits.parking,
                extra: Math.max(0, parking - limits.parking),
                overageCost: Math.max(0, parking - limits.parking) * OVERAGE_RATES.parking,
                rate: OVERAGE_RATES.parking,
                percentage: limits.parking === Infinity ? 0 : Math.round((parking / limits.parking) * 100),
            },
            monitors: {
                current: monitors,
                limit: limits.monitors,
                extra: Math.max(0, monitors - limits.monitors),
                overageCost: Math.max(0, monitors - limits.monitors) * OVERAGE_RATES.monitors,
                rate: OVERAGE_RATES.monitors,
                percentage: limits.monitors === Infinity ? 0 : Math.round((monitors / limits.monitors) * 100),
            },
            security: {
                current: security,
                limit: limits.security,
                extra: Math.max(0, security - limits.security),
                overageCost: Math.max(0, security - limits.security) * OVERAGE_RATES.security,
                rate: OVERAGE_RATES.security,
                percentage: limits.security === Infinity ? 0 : Math.round((security / limits.security) * 100),
            },
            visits: {
                current: visits,
                limit: limits.visits,
                extra: limits.visits === Infinity ? 0 : Math.max(0, visits - limits.visits),
                overageCost: limits.visits === Infinity ? 0 : Math.max(0, visits - limits.visits) * OVERAGE_RATES.visits,
                rate: OVERAGE_RATES.visits,
                percentage: limits.visits === Infinity ? 0 : Math.round((visits / limits.visits) * 100),
            },
            alerts: {
                current: alerts,
                limit: limits.alerts,
                extra: limits.alerts === Infinity ? 0 : Math.max(0, alerts - limits.alerts),
                overageCost: limits.alerts === Infinity ? 0 : Math.max(0, alerts - limits.alerts) * OVERAGE_RATES.alerts,
                rate: OVERAGE_RATES.alerts,
                percentage: limits.alerts === Infinity ? 0 : Math.round((alerts / limits.alerts) * 100),
            },
            reports: {
                current: reports,
                limit: limits.reports,
                extra: limits.reports === Infinity ? 0 : Math.max(0, reports - limits.reports),
                overageCost: limits.reports === Infinity ? 0 : Math.max(0, reports - limits.reports) * OVERAGE_RATES.reports,
                rate: OVERAGE_RATES.reports,
                percentage: limits.reports === Infinity ? 0 : Math.round((reports / limits.reports) * 100),
            },
        };

        const totalOverage = Object.values(resources).reduce((sum, r) => sum + r.overageCost, 0);
        const planPrice = PLAN_PRICES[plan] || 0;

        return {
            plan,
            planPrice,
            resources,
            totalOverage,
            estimatedTotal: planPrice + totalOverage,
        };
    }

    async getSubscription() {
        const tenantId = this.getTenantId();
        if (!tenantId) {
            this.logger.warn('getSubscription: No tenantId found in headers');
            return null;
        }

        if (!process.env.MASTER_DATABASE_URL) {
            this.logger.error('MASTER_DATABASE_URL is missing in environment variables');
        }

        const subscription = await this.masterClient.subscription.findFirst({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
        });

        if (!subscription) {
            this.logger.debug(`getSubscription: No subscription found for tenant ${tenantId}`);
            return null;
        }

        // Diagnostic: check status in PayPal if ID exists
        if (subscription.paypalSubscriptionId) {
            try {
                const paypalDetails = await this.paypalService.getSubscriptionDetails(subscription.paypalSubscriptionId);
                this.logger.log(`Subscription ${subscription.id} status in PayPal: ${paypalDetails.status}`);

                // Sync plan if active
                if (paypalDetails.status === 'ACTIVE' || paypalDetails.status === 'APPROVED') {
                    await this.registrationsService.syncSubscriptionPlan(
                        subscription.paypalSubscriptionId,
                        paypalDetails.plan_id
                    );
                }
            } catch (err) {
                this.logger.error(`Failed to fetch PayPal status for ${subscription.paypalSubscriptionId}: ${err.message}`);
            }
        }

        return {
            id: subscription.id,
            plan: subscription.plan,
            status: subscription.status,
            amount: subscription.amount,
            currentPeriodStart: subscription.currentPeriodStart,
            currentPeriodEnd: subscription.currentPeriodEnd,
            daysRemaining: Math.max(0, Math.ceil(
                (subscription.currentPeriodEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            )),
        };
    }

    async getInvoices() {
        const tenantId = this.getTenantId();
        if (!tenantId) return [];

        const invoices = await this.masterClient.invoice.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            take: 12,
        });

        return invoices.map(inv => ({
            id: inv.id,
            amount: inv.amount,
            overageAmount: inv.overageAmount,
            totalAmount: inv.totalAmount,
            status: inv.status,
            billingPeriodStart: inv.billingPeriodStart,
            billingPeriodEnd: inv.billingPeriodEnd,
            details: inv.details,
            createdAt: inv.createdAt,
        }));
    }

    async calculateOverages(tenantId: string) {
        const tenant = await this.tenantsService.getTenantById(tenantId);
        if (!tenant) return null;

        const plan = tenant.plan || 'starter';
        const limits = PLAN_LIMITS[plan] || PLAN_LIMITS['starter'];

        // We need a tenant-specific prisma client
        const { PrismaClient } = require('@prisma/client');
        const tenantDb = new PrismaClient({
            datasources: { db: { url: tenant.dbUrl } },
        });

        try {
            await tenantDb.$connect();

            const now = new Date();
            const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);

            const [units, parking, monitors, security, visits, alerts, reports] = await Promise.all([
                tenantDb.residentProfile.count(),
                tenantDb.space.count(),
                tenantDb.user.count({ where: { role: 'ADMIN' } }),
                tenantDb.user.count({ where: { role: 'SECURITY' } }),
                tenantDb.visit.count({ where: { createdAt: { gte: periodStart } } }),
                tenantDb.emergencyAlert.count({ where: { createdAt: { gte: periodStart } } }),
                tenantDb.incidentReport.count({ where: { createdAt: { gte: periodStart } } }),
            ]);

            const details: Record<string, any> = {};
            let totalOverage = 0;

            for (const [resource, current] of Object.entries({ units, parking, monitors, security, visits, alerts, reports })) {
                const limit = limits[resource];
                const extra = limit === Infinity ? 0 : Math.max(0, current - limit);
                const cost = extra * OVERAGE_RATES[resource];
                totalOverage += cost;

                details[resource] = {
                    used: current,
                    limit: limit === Infinity ? 'Ilimitado' : limit,
                    extra,
                    cost,
                    rate: OVERAGE_RATES[resource],
                };
            }

            return {
                planPrice: PLAN_PRICES[plan],
                overageAmount: totalOverage,
                totalAmount: PLAN_PRICES[plan] + totalOverage,
                details,
                snapshot: { units, parking, monitors, security },
            };
        } finally {
            await tenantDb.$disconnect();
        }
    }

    async cancelSubscription() {
        const tenantId = this.getTenantId();
        this.logger.debug(`Cancelling subscription for tenant: ${tenantId}`);

        if (!tenantId) throw new BadRequestException('Tenant ID not found');

        const subscription = await this.masterClient.subscription.findFirst({
            where: { tenantId, status: 'ACTIVE' },
            orderBy: { createdAt: 'desc' },
        });

        if (!subscription) {
            const anySub = await this.masterClient.subscription.findFirst({ where: { tenantId } });
            this.logger.warn(`No ACTIVE subscription found for tenant ${tenantId} during cancellation. Any sub? ${!!anySub}`);
            throw new NotFoundException('No active subscription found');
        }

        if (!subscription.paypalSubscriptionId) {
            this.logger.warn(`Subscription ${subscription.id} for tenant ${tenantId} has no PayPal ID. Performing local cancellation only.`);
        }

        // 1. Check for pending or urgent invoices
        const pendingInvoices = await this.masterClient.invoice.findFirst({
            where: {
                tenantId,
                status: { in: ['PENDING', 'URGENTE'] as any }
            }
        });

        if (pendingInvoices) {
            throw new BadRequestException('CANCELLATION_BLOCKED_PENDING_DEBT');
        }

        // 2. Check for current period overages
        const currentUsage = await this.getCurrentUsage();
        if (currentUsage && currentUsage.totalOverage > 0) {
            throw new BadRequestException('CANCELLATION_BLOCKED_OVERAGES');
        }

        try {
            if (subscription.paypalSubscriptionId) {
                await this.paypalService.cancelSubscription(
                    subscription.paypalSubscriptionId,
                    'Cancelled by user from dashboard'
                );
            }

            // Update local DB status
            await this.masterClient.subscription.update({
                where: { id: subscription.id },
                data: { status: 'CANCELLED' },
            });

            return { success: true };
        } catch (error) {
            this.logger.error(`Failed to cancel subscription for tenant ${tenantId}: ${error.message}`);
            throw error;
        }
    }

    async changeSubscription(newPlan: string) {
        const tenantId = this.getTenantId();
        this.logger.debug(`Changing subscription for tenant: ${tenantId}, target plan: ${newPlan}`);

        if (!tenantId) throw new BadRequestException('Tenant ID not found');

        const subscription = await this.masterClient.subscription.findFirst({
            where: { tenantId, status: 'ACTIVE' },
            orderBy: { createdAt: 'desc' },
        });

        if (!subscription) {
            const anySub = await this.masterClient.subscription.findFirst({ where: { tenantId } });
            this.logger.warn(`No ACTIVE subscription found for tenant ${tenantId}. Any sub exists? ${!!anySub}`);
            throw new NotFoundException('No active subscription found');
        }

        if (!subscription.paypalSubscriptionId) {
            this.logger.warn(`Subscription ${subscription.id} found for tenant ${tenantId} but has no paypalSubscriptionId. Change blocked.`);
            throw new BadRequestException('UPGRADE_BLOCKED_MANUAL_PLAN');
        }

        const currentPlan = subscription.plan.toLowerCase();
        const targetPlan = newPlan.toLowerCase();

        if (currentPlan === targetPlan) {
            throw new BadRequestException('Target plan is already active');
        }

        // Validate target plan exists
        const planOrder = ['starter', 'premium', 'elite'];
        const targetIndex = planOrder.indexOf(targetPlan);

        if (targetIndex === -1) {
            throw new BadRequestException('Invalid target plan');
        }

        const paypalPlanId = process.env[`PAYPAL_${targetPlan.toUpperCase()}_PLAN_ID`];
        if (!paypalPlanId) {
            this.logger.error(`PayPal Plan ID not configured for tier: ${targetPlan}`);
            throw new BadRequestException(`Plan configuration missing for ${targetPlan}`);
        }

        this.logger.log(`Initiating PayPal revision: Current Sub ID: ${subscription.paypalSubscriptionId}, Target Plan ID: ${paypalPlanId}`);

        try {
            const revision = await this.paypalService.reviseSubscription(
                subscription.paypalSubscriptionId,
                paypalPlanId
            );

            const approvalUrl = revision.links?.find((l: any) => l.rel === 'approve')?.href;
            this.logger.log(`PayPal revision response status: ${revision.status}, Approval URL: ${approvalUrl}`);

            // Optional: Optimistic update or wait for webhook
            // For now, if no approval is needed, we might need to update the DB
            // But usually PayPal requires approval for price changes

            return {
                success: true,
                approvalUrl,
                status: revision.status
            };
        } catch (error) {
            this.logger.error(`Failed to change subscription for tenant ${tenantId}: ${error.message}`);
            throw error;
        }
    }

    async reactivateSubscription(plan: string) {
        const tenantId = this.getTenantId();
        if (!tenantId) {
            throw new BadRequestException('Organization context required');
        }

        const targetPlan = plan.toLowerCase();
        const paypalPlanId = process.env[`PAYPAL_${targetPlan.toUpperCase()}_PLAN_ID`];

        if (!paypalPlanId) {
            this.logger.error(`PayPal Plan ID not configured for tier: ${targetPlan}`);
            throw new BadRequestException(`Plan configuration missing for ${targetPlan}`);
        }

        const customId = `TENANT:${tenantId}`;
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';

        // We use a specific success URL to handle the reactivation callback on frontend
        // Note: We don't have a 'registration' ID here, so we rely on the webhook
        // or we successfuly redirect to billing page directly.
        // We add a 'reactivated=true' query param to show a success message.
        const returnUrl = `${frontendUrl}/billing?reactivated=true&plan=${targetPlan}`;
        const cancelUrl = `${frontendUrl}/billing?cancelled=true`;

        try {
            this.logger.log(`Initiating subscription reactivation for tenant ${tenantId} on plan ${targetPlan}`);

            const subscription = await this.paypalService.createSubscription(
                paypalPlanId,
                customId,
                returnUrl,
                cancelUrl
            );

            const approvalUrl = subscription.links?.find((l: any) => l.rel === 'approve')?.href;

            return {
                approvalUrl,
                subscriptionId: subscription.id
            };

        } catch (error) {
            this.logger.error(`Failed to initiate reactivation for tenant ${tenantId}: ${error.message}`);
            throw error;
        }
    }

    async finalizeReactivation(paypalSubscriptionId: string) {
        const tenantId = this.getTenantId();
        if (!tenantId) {
            throw new BadRequestException('Organization context required');
        }

        this.logger.log(`Finalizing reactivation for tenant ${tenantId} and sub ${paypalSubscriptionId}`);

        try {
            // 1. Fetch details from PayPal to ensure it's ACTIVE and get the plan_id
            const details = await this.paypalService.getSubscriptionDetails(paypalSubscriptionId);

            if (details.status !== 'ACTIVE' && details.status !== 'APPROVED') {
                this.logger.warn(`Subscription ${paypalSubscriptionId} is not in an active state: ${details.status}`);
                return { success: false, status: details.status };
            }

            // 2. Use registrationsService to finalize the local DB update
            await this.registrationsService.reactivateSubscription(tenantId, paypalSubscriptionId, details.plan_id);

            return { success: true };
        } catch (error) {
            this.logger.error(`Failed to finalize reactivation for tenant ${tenantId}: ${error.message}`);
            throw error;
        }
    }
}
