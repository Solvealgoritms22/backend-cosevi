import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Post()
    create(@Request() req, @Body() createReportDto: CreateReportDto) {
        return this.reportsService.create(req.user.userId, createReportDto);
    }

    @Get()
    findAll() {
        return this.reportsService.findAll();
    }

    @Get('my')
    findMyReports(@Request() req) {
        return this.reportsService.findByUser(req.user.userId);
    }

    @Post(':id/comments')
    addComment(
        @Param('id') id: string,
        @Request() req,
        @Body() createCommentDto: CreateCommentDto,
    ) {
        return this.reportsService.addComment(id, req.user.userId, createCommentDto);
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.reportsService.updateStatus(id, status);
    }
}
