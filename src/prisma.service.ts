import { Injectable, Scope, Inject, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { TenantsService } from './tenants/tenants.service';

@Injectable({ scope: Scope.REQUEST })
export class PrismaService extends PrismaClient {
    private static clients: Map<string, PrismaClient> = new Map();

    constructor(
        @Inject(REQUEST) private request: Request,
        private tenantsService: TenantsService,
    ) {
        super();
    }

    async getClient(): Promise<PrismaClient> {
        const tenantId = this.request.headers['x-tenant-id'] as string;

        if (!tenantId) {
            // If no tenant ID, we might be in a public endpoint or master DB context
            // For now, let's assume we need a tenant ID for all protected routes
            throw new InternalServerErrorException('Tenant ID missing in request headers');
        }

        if (PrismaService.clients.has(tenantId)) {
            return PrismaService.clients.get(tenantId);
        }

        const tenant = await this.tenantsService.getTenantById(tenantId);
        if (!tenant) {
            throw new InternalServerErrorException('Tenant not found');
        }

        const client = new PrismaClient({
            datasources: {
                db: {
                    url: tenant.dbUrl,
                },
            },
        });

        await client.$connect();
        PrismaService.clients.set(tenantId, client);
        return client;
    }

    // Override common methods to use the dynamic client
    // Note: This is a simplified approach. In a real complex app, 
    // you might want to use a proxy or a factory.

    get user() { return this.getProxy('user'); }
    get visitor() { return this.getProxy('visitor'); }
    get visit() { return this.getProxy('visit'); }
    get space() { return this.getProxy('space'); }
    get incidentReport() { return this.getProxy('incidentReport'); }
    get emergencyAlert() { return this.getProxy('emergencyAlert'); }
    get notification() { return this.getProxy('notification'); }
    get residentProfile() { return this.getProxy('residentProfile'); }
    get securityProfile() { return this.getProxy('securityProfile'); }
    get vehicle() { return this.getProxy('vehicle'); }
    get accessLog() { return this.getProxy('accessLog'); }
    get incidentComment() { return this.getProxy('incidentComment'); }

    private getProxy(model: string) {
        return new Proxy({}, {
            get: (target, prop) => {
                return async (...args: any[]) => {
                    const client = await this.getClient();
                    return (client as any)[model][prop](...args);
                };
            }
        });
    }
}
