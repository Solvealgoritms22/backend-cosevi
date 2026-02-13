import { Module, forwardRef } from '@nestjs/common';
import { PayPalService } from './paypal.service';
import { PayPalController } from './paypal.controller';
import { RegistrationsModule } from '../registrations/registrations.module';

@Module({
    imports: [forwardRef(() => RegistrationsModule)],
    providers: [PayPalService],
    controllers: [PayPalController],
    exports: [PayPalService],
})
export class PayPalModule { }
