import { Module } from '@nestjs/common';
import { LprService } from './lpr.service';
import { LprController } from './lpr.controller';

@Module({
  controllers: [LprController],
  providers: [LprService],
})
export class LprModule {}
