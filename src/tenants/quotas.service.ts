import { Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from '../prisma.service';
import { TenantsService } from './tenants.service';
import { PLAN_LIMITS } from '../auth/guards/plan.guard';

@Injectable()
export class QuotasService {
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
            throw new ForbiddenException(
                `Alcanzó el límite de su plan (${limit}) para el recurso: ${resource}. Actualice a un plan superior.`
            );
        }
    }
}
