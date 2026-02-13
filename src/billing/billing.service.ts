import { Injectable, Logger, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaClient as MasterClient } from '../../prisma/generated/master';
import { PrismaService } from '../prisma.service';
import { TenantsService } from '../tenants/tenants.service';
import { PLAN_LIMITS } from '../auth/guards/plan.guard';

const PLAN_PRICES: Record<string, number> = {
    starter: 49,
    premium: 129,
    elite: 299,
};

const OVERAGE_RATES: Record<string, number> = {
    units: 1.50,
    parking: 0.75,
    monitors: 10.00,
    security: 5.00,
};

@Injectable()
export class BillingService {
    private readonly logger = new Logger(BillingService.name);
    private masterClient: MasterClient;

    constructor(
        private prisma: PrismaService,
        private tenantsService: TenantsService,
        @Inject(REQUEST) private request: Request,
    ) {
        this.masterClient = new MasterClient({
            datasources: { db: { url: process.env.MASTER_DATABASE_URL } },
        });
    }

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
        const [units, parking, monitors, security] = await Promise.all([
            this.prisma.residentProfile.count(),
            this.prisma.space.count(),
            this.prisma.user.count({ where: { role: 'ADMIN' } }),
            this.prisma.user.count({ where: { role: 'SECURITY' } }),
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
        if (!tenantId) return null;

        const subscription = await this.masterClient.subscription.findFirst({
            where: { tenantId, status: 'ACTIVE' },
            orderBy: { createdAt: 'desc' },
        });

        if (!subscription) return null;

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

            const [units, parking, monitors, security] = await Promise.all([
                tenantDb.residentProfile.count(),
                tenantDb.space.count(),
                tenantDb.user.count({ where: { role: 'ADMIN' } }),
                tenantDb.user.count({ where: { role: 'SECURITY' } }),
            ]);

            const details: Record<string, any> = {};
            let totalOverage = 0;

            for (const [resource, current] of Object.entries({ units, parking, monitors, security })) {
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
}
