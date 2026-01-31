import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('spaces')
export class SpacesController {
    constructor(private readonly spacesService: SpacesService) { }

    @Post()
    create(@Body() createSpaceDto: CreateSpaceDto) {
        return this.spacesService.create(createSpaceDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req, @Query('residentId') residentId?: string) {
        return this.spacesService.findAll(req.user, residentId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.spacesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
        return this.spacesService.update(id, updateSpaceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.spacesService.remove(id);
    }
}
