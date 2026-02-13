import { Module, forwardRef } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { PayPalModule } from '../paypal/paypal.module';

@Module({
    imports: [forwardRef(() => PayPalModule)],
    providers: [RegistrationsService],
    controllers: [RegistrationsController],
    exports: [RegistrationsService],
})
export class RegistrationsModule { }
