import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { EmergenciesService } from './emergencies.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('emergencies')
@UseGuards(JwtAuthGuard)
export class EmergenciesController {
    constructor(private readonly emergenciesService: EmergenciesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() createEmergencyDto: CreateEmergencyDto) {
        return this.emergenciesService.create(req.user.userId, createEmergencyDto);
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
