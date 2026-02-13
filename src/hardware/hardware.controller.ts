import { Controller, Post, Get, Body, UseGuards, Param, Req, NotFoundException } from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlanGuard, Plan, PLANS } from '../auth/guards/plan.guard';

@Controller('hardware')
export class HardwareController {
    constructor(private readonly hardwareService: HardwareService) { }

    @Post('webhook')
    @UseGuards(ApiKeyGuard)
    async handleWebhook(@Body() payload: { deviceId: string; type: string; data: any }) {
        return this.hardwareService.logEvent(payload.deviceId, payload.type, payload.data);
    }

    @Post('devices')
    @UseGuards(JwtAuthGuard, PlanGuard)
    @Plan(PLANS.ELITE)
    async registerDevice(@Body() data: { name: string; type: string; location?: string }) {
        return this.hardwareService.registerDevice(data);
    }

    @Get('events')
    @UseGuards(JwtAuthGuard, PlanGuard)
    @Plan(PLANS.ELITE)
    async getEvents() {
        return this.hardwareService.getLatestEvents();
    }

    @Get('devices')
    @UseGuards(JwtAuthGuard, PlanGuard)
    @Plan(PLANS.ELITE)
    async getDevices() {
        return this.hardwareService.getDevices();
    }

    // --- IoT Device Endpoints (Guarded by API Key) ---

    @Post('heartbeat')
    @UseGuards(ApiKeyGuard)
    async heartbeat(@Body() body: { deviceId: string }) {
        return this.hardwareService.updateHeartbeat(body.deviceId);
    }

    @Get('poll') // Query param: ?deviceId=...
    @UseGuards(ApiKeyGuard)
    async poll(@Req() req) {
        // req.query might need strict checking
        const deviceId = req.query.deviceId as string;
        if (!deviceId) throw new NotFoundException('Device ID required');
        return this.hardwareService.pollCommands(deviceId);
    }

    @Post('ack/:id')
    @UseGuards(ApiKeyGuard)
    async ack(@Param('id') id: string) {
        return this.hardwareService.ackCommand(id);
    }

    // --- Admin Commands ---

    @Post('devices/:id/command')
    @UseGuards(JwtAuthGuard, PlanGuard)
    @Plan(PLANS.ELITE)
    async sendCommand(@Param('id') id: string, @Body() body: { command: string; payload?: any }) {
        return this.hardwareService.sendCommand(id, body.command, body.payload);
    }
}
