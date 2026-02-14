import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient as MasterClient } from '../../prisma/generated/master';

@Injectable()
export class TenantsService implements OnModuleInit, OnModuleDestroy {
    private masterClient: MasterClient;

    constructor() {
        const masterUrl = process.env.MASTER_DATABASE_URL || process.env.DATABASE_URL;

        if (!masterUrl) {
            console.warn('⚠️ Warning: Neither MASTER_DATABASE_URL nor DATABASE_URL is defined. TenantsService will fail.');
        }

        this.masterClient = new MasterClient({
            datasources: {
                db: {
                    url: masterUrl,
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

    async getTenantByAdminEmail(adminEmail: string) {
        return this.masterClient.tenant.findUnique({
            where: { adminEmail },
        });
    }

    // Global User Map methods
    async getGlobalUser(email: string) {
        return this.masterClient.globalUserMap.findUnique({
            where: { email },
        });
    }

    async upsertGlobalUser(data: { email: string; tenantId: string; role: string }) {
        return this.masterClient.globalUserMap.upsert({
            where: { email: data.email },
            update: { tenantId: data.tenantId, role: data.role },
            create: data,
        });
    }

    async removeGlobalUser(email: string) {
        try {
            return await this.masterClient.globalUserMap.delete({
                where: { email },
            });
        } catch { }
    }

    async getAllTenants() {
        return this.masterClient.tenant.findMany({
            where: { isActive: true },
        });
    }

    // Helper to create a new tenant (for the signup flow)
    async createTenant(data: { name: string; subdomain: string; dbUrl: string; plan: string; adminEmail?: string; location?: string; logoUrl?: string }) {
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

    async generateApiKey(tenantId: string) {
        const apiKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        return this.masterClient.tenant.update({
            where: { id: tenantId },
            data: { apiKey },
        });
    }
}
