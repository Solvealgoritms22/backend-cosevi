import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma.module';
import { SocketModule } from '../socket.module';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
    imports: [PrismaModule, SocketModule],
    controllers: [ReportsController],
    providers: [ReportsService],
})
export class ReportsModule { }
