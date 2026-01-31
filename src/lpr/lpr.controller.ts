import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LprService } from './lpr.service';
import { CreateLprDto } from './dto/create-lpr.dto';
import { UpdateLprDto } from './dto/update-lpr.dto';

@Controller('lpr')
export class LprController {
  constructor(private readonly lprService: LprService) { }

  @Get('verify/:plate')
  verifyPlate(@Param('plate') plate: string) {
    return this.lprService.verifyPlate(plate);
  }

  @Post('process-plate')
  processPlate(@Body('plate') plate: string) {
    return this.lprService.processPlate(plate);
  }
}
