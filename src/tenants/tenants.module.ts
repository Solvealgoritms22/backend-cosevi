import { Global, Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';

import { QuotasService } from './quotas.service';

@Global()
@Module({
    providers: [TenantsService, QuotasService],
    exports: [TenantsService, QuotasService],
})
export class TenantsModule { }
