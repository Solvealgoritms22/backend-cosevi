import { Controller, Post, Get, Body, UseGuards, Param } from '@nestjs/common';
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
}
