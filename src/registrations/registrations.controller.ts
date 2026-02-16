import { Controller, Post, Get, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';

@Controller('registrations')
export class RegistrationsController {
    constructor(private readonly registrationsService: RegistrationsService) { }

    @Post('pending')
    @HttpCode(HttpStatus.CREATED)
    createPending(@Body() body: {
        name: string;
        email: string;
        password: string;
        organizationName: string;
        location?: string;
        plan: string;
        logoUrl?: string;
    }) {
        return this.registrationsService.createPendingRegistration(body);
    }

    @Post('confirm')
    @HttpCode(HttpStatus.OK)
    confirmPayment(@Body() body: {
        registrationId: string;
        paypalToken: string;
    }) {
        console.log(`[DEBUG] POST /confirm endpoint hit`, JSON.stringify(body));
        return this.registrationsService.confirmPayment(body.registrationId, body.paypalToken);
    }

    @Get('status/:id')
    getStatus(@Param('id') id: string) {
        return this.registrationsService.getRegistrationStatus(id);
    }
}
