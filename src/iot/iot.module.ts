import { Module } from '@nestjs/common';
import { IotController } from './iot.controller';
import { IotService } from './iot.service';
import { PrismaService } from '../prisma.service';
import { TenantsModule } from '../tenants/tenants.module';

@Module({
    imports: [TenantsModule],
    controllers: [IotController],
    providers: [IotService, PrismaService],
})
export class IotModule { }
