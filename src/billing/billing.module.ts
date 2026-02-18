import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { PayPalModule } from '../paypal/paypal.module';

@Module({
    imports: [PayPalModule],
    providers: [BillingService],
    controllers: [BillingController],
    exports: [BillingService],
})
export class BillingModule { }
