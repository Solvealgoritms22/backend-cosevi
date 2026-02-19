import { Module, forwardRef } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { PayPalModule } from '../paypal/paypal.module';
import { RegistrationsModule } from '../registrations/registrations.module';

@Module({
    imports: [PayPalModule, forwardRef(() => RegistrationsModule)],
    providers: [BillingService],
    controllers: [BillingController],
    exports: [BillingService],
})
export class BillingModule { }
