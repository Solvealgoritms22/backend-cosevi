import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient as MasterClient } from '../../prisma/generated/master';

@Injectable()
export class TenantsService implements OnModuleInit, OnModuleDestroy {
    private masterClient: MasterClient;

    constructor() {
        this.masterClient = new MasterClient({
            datasources: {
                db: {
                    url: process.env.MASTER_DATABASE_URL,
                },
            },
        });
    }

    async onModuleInit() {
        await this.masterClient.$connect();
    }

    async onModuleDestroy() {
        await this.masterClient.$disconnect();
    }

    async getTenantBySubdomain(subdomain: string) {
        return this.masterClient.tenant.findUnique({
            where: { subdomain },
        });
    }

    async getTenantById(id: string) {
        return this.masterClient.tenant.findUnique({
            where: { id },
        });
    }

    async getTenantByApiKey(apiKey: string) {
        return (this.masterClient.tenant as any).findUnique({
            where: { apiKey },
        });
    }

    async getAllTenants() {
        return this.masterClient.tenant.findMany({
            where: { isActive: true },
        });
    }

    // Helper to create a new tenant (for the signup flow)
    async createTenant(data: { name: string; subdomain: string; dbUrl: string; plan: string; location?: string; logoUrl?: string }) {
        return this.masterClient.tenant.create({
            data,
        });
    }

    async updateBranding(tenantId: string, data: { logoUrl?: string; primaryColor?: string; secondaryColor?: string }) {
        return this.masterClient.tenant.update({
            where: { id: tenantId },
            data,
        });
    }
}
