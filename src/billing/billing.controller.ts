import { Controller, Get, Patch, UseGuards, Post, Body } from '@nestjs/common';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('billing')
@UseGuards(JwtAuthGuard)
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @Get('usage')
    getCurrentUsage() {
        return this.billingService.getCurrentUsage();
    }

    @Get('subscription')
    getSubscription() {
        return this.billingService.getSubscription();
    }

    @Get('invoices')
    getInvoices() {
        return this.billingService.getInvoices();
    }

    @Patch('cancel-subscription')
    cancelSubscription() {
        return this.billingService.cancelSubscription();
    }

    @Post('upgrade-subscription')
    upgradeSubscription(@Body('plan') plan: string) {
        return this.billingService.upgradeSubscription(plan);
    }

    @Post('reactivate-subscription')
    reactivateSubscription(@Body('plan') plan: string) {
        return this.billingService.reactivateSubscription(plan);
    }

    @Post('finalize-reactivation')
    finalizeReactivation(@Body('paypalSubscriptionId') paypalSubscriptionId: string) {
        return this.billingService.finalizeReactivation(paypalSubscriptionId);
    }
}
