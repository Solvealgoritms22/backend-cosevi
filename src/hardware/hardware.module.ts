import { Module } from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { HardwareController } from './hardware.controller';
import { TenantsModule } from '../tenants/tenants.module';

@Module({
    imports: [TenantsModule],
    controllers: [HardwareController],
    providers: [HardwareService],
    exports: [HardwareService],
})
export class HardwareModule { }
