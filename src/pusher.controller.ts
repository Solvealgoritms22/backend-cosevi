import { Controller, Post, Body, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PusherService } from './pusher.service';

@Controller('pusher')
export class PusherController {
    constructor(private pusherService: PusherService) { }

    @UseGuards(JwtAuthGuard)
    @Post('auth')
    async authenticate(@Request() req: any, @Body() body: { socket_id: string; channel_name: string }) {
        const user = req.user;
        const { socket_id, channel_name } = body;

        // Channel pattern: private-tenant-{tenantId}-{resource}
        const tenantMatch = channel_name.match(/^private-tenant-([a-f0-9-]+)-/);

        if (!tenantMatch) {
            throw new ForbiddenException('Invalid channel format');
        }

        const requestedTenantId = tenantMatch[1];

        // Check if user belongs to the requested tenant
        // Note: req.user should have tenantId if our JWT strategy includes it
        if (user.role !== 'ADMIN' && user.tenantId !== requestedTenantId) {
            throw new ForbiddenException('You do not have access to this tenant channel');
        }

        // For ADMIN, we might allow them to join any tenant channel or restrict to their own
        // If user.tenantId is null (super admin), allow access.

        const authResponse = (this.pusherService as any).pusher.authorizeChannel(socket_id, channel_name);
        return authResponse;
    }
}
