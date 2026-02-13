import { Controller, Get, Post, Body, Param, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { IotService } from './iot.service';
import { ApiKeyGuard } from './guards/api-key.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('iot')
export class IotController {
    constructor(private readonly iotService: IotService) { }

    // --- Device-Facing Endpoints (Protected by API Key) ---

    @UseGuards(ApiKeyGuard)
    @Post('heartbeat')
    async heartbeat(@Body() body: { deviceId: string }) {
        return this.iotService.updateHeartbeat(body.deviceId);
    }

    @UseGuards(ApiKeyGuard)
    @Get('poll') // Query param: ?deviceId=...
    async poll(@Req() req) {
        const deviceId = req.query.deviceId as string;
        if (!deviceId) throw new NotFoundException('Device ID required');
        return this.iotService.pollCommands(deviceId);
    }

    @UseGuards(ApiKeyGuard)
    @Post('ack/:id')
    async ack(@Param('id') id: string) {
        return this.iotService.ackCommand(id);
    }

    @UseGuards(ApiKeyGuard)
    @Post('events')
    async logEvent(@Body() body: { deviceId: string, type: string, data?: any }) {
        return this.iotService.logEvent(body.deviceId, body.type, body.data);
    }

    // --- Admin-Facing Endpoints (Protected by JWT) ---

    @UseGuards(JwtAuthGuard)
    @Get('devices')
    async getDevices() {
        return this.iotService.getDevices();
    }

    @UseGuards(JwtAuthGuard)
    @Post('devices')
    async registerDevice(@Body() body: { name: string; type: string; location?: string }) {
        return this.iotService.registerDevice(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('devices/:id/command')
    async sendCommand(@Param('id') id: string, @Body() body: { command: string; payload?: any }) {
        return this.iotService.sendCommand(id, body.command, body.payload);
    }
}
