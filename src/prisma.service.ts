import { Injectable, Scope, Inject, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { TenantsService } from './tenants/tenants.service';

@Injectable({ scope: Scope.REQUEST })
export class PrismaService extends PrismaClient implements OnModuleInit {
    private static clients: Map<string, PrismaClient> = new Map();

    constructor(
        @Inject(REQUEST) private request: Request,
        private tenantsService: TenantsService,
    ) {
        super();
    }

    async onModuleInit() {
        // We don't connect the base client because we use dynamic ones
    }

    async getClient(): Promise<PrismaClient> {
        // In NestJS, during startup or some contexts, REQUEST might be undefined
        if (!this.request || !this.request.headers) {
            return this; // Fallback to default client if possible
        }

        const tenantId = this.request.headers['x-tenant-id'] as string;

        if (!tenantId) {
            // Check if we are in a public route that doesn't need tenant isolation
            // or if we should use a default one. 
            // For now, let's keep it strict or use the default DATABASE_URL
            return this;
        }

        if (PrismaService.clients.has(tenantId)) {
            return PrismaService.clients.get(tenantId)!;
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

    // Helper to proxy model calls
    private getModelProxy<T>(model: string): T {
        return new Proxy({} as any, {
            get: (target, prop) => {
                return async (...args: any[]) => {
                    const client = await this.getClient();
                    return (client as any)[model][prop](...args);
                };
            }
        });
    }

    // Explicitly override properties with correct types to satisfy TypeScript
    get user() { return this.getModelProxy<PrismaClient['user']>('user'); }
    get visitor() { return this.getModelProxy<PrismaClient['visitor']>('visitor'); }
    get visit() { return this.getModelProxy<PrismaClient['visit']>('visit'); }
    get space() { return this.getModelProxy<PrismaClient['space']>('space'); }
    get incidentReport() { return this.getModelProxy<PrismaClient['incidentReport']>('incidentReport'); }
    get emergencyAlert() { return this.getModelProxy<PrismaClient['emergencyAlert']>('emergencyAlert'); }
    get notification() { return this.getModelProxy<PrismaClient['notification']>('notification'); }
    get residentProfile() { return this.getModelProxy<PrismaClient['residentProfile']>('residentProfile'); }
    get securityProfile() { return this.getModelProxy<PrismaClient['securityProfile']>('securityProfile'); }
    get vehicle() { return this.getModelProxy<PrismaClient['vehicle']>('vehicle'); }
    get accessLog() { return this.getModelProxy<PrismaClient['accessLog']>('accessLog'); }
    get incidentComment() { return this.getModelProxy<PrismaClient['incidentComment']>('incidentComment'); }
}
