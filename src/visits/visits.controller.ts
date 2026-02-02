import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitsService } from './visits.service';

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitsService: VisitsService) { }

    @Post()
    create(@Body() createVisitDto: CreateVisitDto) {
        return this.visitsService.create(createVisitDto);
    }

    @Get()
    findAll(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
        return this.visitsService.findAll(startDate, endDate);
    }

    @Get('my-visits/:hostId')
    findByHost(
        @Param('hostId') hostId: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.visitsService.findByHost(hostId, startDate, endDate);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.visitsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto) {
        return this.visitsService.update(id, updateVisitDto);
    }

    @Post('check-in')
    checkIn(@Body('qrCode') qrCode: string) {
        return this.visitsService.checkIn(qrCode);
    }

    @Post('check-in-code')
    checkInByCode(@Body('accessCode') accessCode: string) {
        return this.visitsService.checkInByCode(accessCode);
    }

    @Patch(':id/check-out')
    checkOut(@Param('id') id: string) {
        return this.visitsService.checkOut(id);
    }

    @Post('check-out-code')
    checkOutByCode(@Body('accessCode') accessCode: string) {
        return this.visitsService.checkOutByCode(accessCode);
    }

    @UseGuards(JwtAuthGuard)
    @Post('manual-checkin')
    manualCheckIn(@Request() req, @Body() data: any) {
        return this.visitsService.manualCheckIn(req.user.userId, data);
    }

    @Patch(':id/cancel')
    cancel(@Param('id') id: string) {
        return this.visitsService.cancel(id);
    }

    @Patch(':id/approve')
    approve(@Param('id') id: string) {
        return this.visitsService.approve(id);
    }

    @Patch(':id/deny')
    deny(@Param('id') id: string) {
        return this.visitsService.deny(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.visitsService.remove(id);
    }
}
