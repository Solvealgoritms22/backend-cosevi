import { Global, Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { QuotasService } from './quotas.service';

@Global()
@Module({
    controllers: [TenantsController],
    providers: [TenantsService, QuotasService],
    exports: [TenantsService, QuotasService],
})
export class TenantsModule { }
