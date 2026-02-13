import { Injectable, Inject, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from '../prisma.service';
import { TenantsService } from './tenants.service';
import { PLAN_LIMITS } from '../auth/guards/plan.guard';

@Injectable()
export class QuotasService {
    private readonly logger = new Logger(QuotasService.name);

    constructor(
        private prisma: PrismaService,
        private tenantsService: TenantsService,
        @Inject(REQUEST) private request: Request,
    ) { }

    private async getTenantPlan() {
        const tenantId = this.request.headers['x-tenant-id'] as string;
        if (!tenantId) return 'starter';

        const tenant = await this.tenantsService.getTenantById(tenantId);
        return tenant?.plan || 'starter';
    }

    async checkQuota(resource: 'units' | 'parking' | 'monitors' | 'security') {
        const plan = await this.getTenantPlan();
        const limit = PLAN_LIMITS[plan][resource];

        if (limit === Infinity) return;

        let currentCount = 0;

        switch (resource) {
            case 'units':
                currentCount = await this.prisma.residentProfile.count();
                break;
            case 'parking':
                currentCount = await this.prisma.space.count();
                break;
            case 'monitors':
                currentCount = await this.prisma.user.count({ where: { role: 'ADMIN' } });
                break;
            case 'security':
                currentCount = await this.prisma.user.count({ where: { role: 'SECURITY' } });
                break;
        }

        if (currentCount >= limit) {
            // Soft overage: allow operation but log the excess
            this.logger.warn(
                `[OVERAGE] Tenant plan "${plan}" exceeded limit for ${resource}: ${currentCount}/${limit}. ` +
                `Overage will be billed on next invoice.`
            );
            // Operation continues — overage is calculated at billing time by BillingService
        }
    }
}
