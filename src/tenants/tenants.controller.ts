import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {
    constructor(private readonly tenantsService: TenantsService) { }

    // Public endpoint - no JWT guard (used by mobile login screens)
    @Get(':id/branding')
    async getTenantBranding(@Param('id') id: string) {
        const tenant = await this.tenantsService.getTenantById(id);
        if (!tenant) {
            throw new NotFoundException('Tenant not found');
        }
        return {
            name: tenant.name,
            logoUrl: tenant.logoUrl,
            primaryColor: tenant.primaryColor,
            secondaryColor: tenant.secondaryColor,
        };
    }
}
