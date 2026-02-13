import { Injectable, Scope, Inject, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { TenantsService } from './tenants/tenants.service';

@Injectable({ scope: Scope.REQUEST })
export class PrismaService extends PrismaClient implements OnModuleInit {
    private static clients: Map<string, PrismaClient> = new Map();

    // We use a separate default client to avoid infinite recursion when no tenant is present
    private static defaultClient: PrismaClient = new PrismaClient();

    constructor(
        @Inject(REQUEST) private request: Request,
        private tenantsService: TenantsService,
    ) {
        super();
    }

    async onModuleInit() {
        // Base client doesn't need to connect as we use defaultClient or dynamic ones
    }

    async getClient(): Promise<PrismaClient> {
        // In some contexts (like migrations or seeds), request might be undefined
        if (!this.request || !this.request.headers) {
            return PrismaService.defaultClient;
        }

        const tenantId = this.request.headers['x-tenant-id'] as string;

        if (!tenantId) {
            return PrismaService.defaultClient;
        }

        if (PrismaService.clients.has(tenantId)) {
            return PrismaService.clients.get(tenantId)!;
        }

        const tenant = await this.tenantsService.getTenantById(tenantId);
        if (!tenant) {
            // If tenant not found, fallback to default or throw
            return PrismaService.defaultClient;
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

    // Proxy helper that avoids recursion by calling models on the resolved client
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

    // Override model getters with Proxies to the current tenant's client
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
    get hardwareDevice() { return this.getModelProxy<any>('hardwareDevice'); }
    get hardwareEvent() { return this.getModelProxy<any>('hardwareEvent'); }
    get iotCommand() { return this.getModelProxy<any>('iotCommand'); }
}
