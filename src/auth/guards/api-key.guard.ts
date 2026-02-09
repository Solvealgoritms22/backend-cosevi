import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { TenantsService } from '../../tenants/tenants.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        private tenantsService: TenantsService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        if (!apiKey) {
            throw new UnauthorizedException('API Key is missing');
        }

        // Search for tenant with this API Key in the Master DB
        const tenant = await this.tenantsService.getTenantByApiKey(apiKey);

        if (!tenant) {
            throw new UnauthorizedException('Invalid API Key');
        }

        if (tenant.plan !== 'elite') {
            throw new ForbiddenException('Hardware integration requires an Elite plan');
        }

        // Attach tenant id to request so PrismaService can pivot to the correct DB
        request.headers['x-tenant-id'] = tenant.id;
        request['tenant'] = tenant;

        return true;
    }
}
