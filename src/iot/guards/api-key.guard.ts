import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { TenantsService } from '../../tenants/tenants.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private readonly tenantsService: TenantsService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-tenant-api-key'];

        if (!apiKey) {
            throw new UnauthorizedException('API Key missing');
        }

        const tenant = await this.tenantsService.getTenantByApiKey(apiKey);
        if (!tenant) {
            throw new UnauthorizedException('Invalid API Key');
        }

        // Attach tenant to request for controller use and PrismaService resolution
        request.tenant = tenant;
        request.headers['x-tenant-id'] = tenant.id;
        return true;
    }
}
