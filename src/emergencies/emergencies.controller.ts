import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { EmergenciesService } from './emergencies.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlanGuard, Plan, PLANS } from '../auth/guards/plan.guard';

@Controller('emergencies')
@UseGuards(JwtAuthGuard, PlanGuard)
export class EmergenciesController {
    constructor(private readonly emergenciesService: EmergenciesService) { }

    @Post()
    @Plan(PLANS.PREMIUM)
    create(@Request() req, @Body() createEmergencyDto: CreateEmergencyDto) {
        return this.emergenciesService.create(req.user.userId, createEmergencyDto, req.user.tenantId);
    }

    @Get()
    findAll() {
        return this.emergenciesService.findAll();
    }

    @Patch(':id/resolve')
    resolve(@Param('id') id: string) {
        return this.emergenciesService.resolve(id);
    }
}
