import { Controller, Get, Patch, Post, Param, Body, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

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

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getTenantDetails(@Req() req: Request) {
        const tenantId = req.headers['x-tenant-id'] as string;
        if (!tenantId) {
            throw new NotFoundException('Tenant not identified');
        }
        return this.tenantsService.getTenantById(tenantId);
    }

    // Protected endpoint - update branding for the current tenant
    @UseGuards(JwtAuthGuard)
    @Patch('branding')
    async updateBranding(
        @Req() req: Request,
        @Body() body: { logoUrl?: string; primaryColor?: string; secondaryColor?: string },
    ) {
        const tenantId = req.headers['x-tenant-id'] as string;
        if (!tenantId) {
            throw new NotFoundException('Tenant not identified');
        }

        const updated = await this.tenantsService.updateBranding(tenantId, body);

        // Return the updated branding
        return {
            name: updated.name,
            logoUrl: updated.logoUrl,
            primaryColor: updated.primaryColor,
            secondaryColor: updated.secondaryColor,
        };
    }
    @UseGuards(JwtAuthGuard)
    @Post('api-key')
    async generateApiKey(@Req() req: Request) {
        const tenantId = req.headers['x-tenant-id'] as string;
        if (!tenantId) {
            throw new NotFoundException('Tenant not identified');
        }

        const tenant = await this.tenantsService.generateApiKey(tenantId);
        return { apiKey: tenant.apiKey };
    }
}
