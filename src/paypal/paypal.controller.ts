import { Controller, Post, Body, Headers, Req, Logger, HttpCode, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { PayPalService } from './paypal.service';
import { RegistrationsService } from '../registrations/registrations.service';
import { Request } from 'express';

@Controller('paypal')
export class PayPalController {
    private readonly logger = new Logger(PayPalController.name);

    constructor(
        private readonly paypalService: PayPalService,
        @Inject(forwardRef(() => RegistrationsService))
        private readonly registrationsService: RegistrationsService,
    ) { }

    @Post('initialize-plans')
    async initializePlans() {
        this.logger.log('Initializing PayPal products and plans...');
        try {
            // 1. Create Product
            const products = await this.paypalService.listProducts();
            let product = products.products?.find((p: any) => p.name === 'ENTRAR');

            if (!product) {
                product = await this.paypalService.createProduct('ENTRAR', 'Servicios de Seguridad y Gestión Residencial');
                this.logger.log(`Created new PayPal product: ${product.id}`);
            } else {
                this.logger.log(`Using existing PayPal product: ${product.id}`);
            }

            // 2. Create Plans
            const tiers = [
                { name: 'Starter', price: 49 },
                { name: 'Premium', price: 129 },
                { name: 'Elite', price: 299 },
            ];

            const createdPlans: any = {};
            for (const tier of tiers) {
                const plan = await this.paypalService.createPlan(
                    product.id,
                    `Plan ${tier.name}`,
                    `Suscripción mensual al plan ${tier.name}`,
                    tier.price
                );
                createdPlans[tier.name.toLowerCase()] = plan.id;
                this.logger.log(`Created PayPal plan for ${tier.name}: ${plan.id}`);
            }

            return {
                message: 'PayPal plans initialized successfully',
                product_id: product.id,
                plans: createdPlans
            };
        } catch (error: any) {
            this.logger.error(`Failed to initialize PayPal plans: ${error.message}`);
            throw error;
        }
    }

    @Post('webhook')
    @HttpCode(HttpStatus.OK)
    async handleWebhook(
        @Headers() headers: Record<string, string>,
        @Body() body: any,
        @Req() req: Request,
    ) {
        this.logger.log(`PayPal webhook received: ${body?.event_type}`);

        // Verify webhook signature in production
        try {
            const rawBody = (req as any).rawBody?.toString() || JSON.stringify(body);
            const isValid = await this.paypalService.verifyWebhookSignature(headers, rawBody);
            if (!isValid) {
                this.logger.error('Invalid PayPal webhook signature');
                return { status: 'INVALID_SIGNATURE' };
            }
        } catch (err) {
            this.logger.warn(`Webhook signature verification error: ${err.message}`);
            // Continue processing if PAYPAL_WEBHOOK_ID is not set (dev mode)
        }

        const eventType = body?.event_type;

        switch (eventType) {
            case 'CHECKOUT.ORDER.APPROVED':
                await this.handleOrderApproved(body);
                break;

            case 'BILLING.SUBSCRIPTION.ACTIVATED':
                await this.handleSubscriptionActivated(body);
                break;

            case 'BILLING.SUBSCRIPTION.UPDATED':
                await this.handleSubscriptionUpdated(body);
                break;

            case 'PAYMENT.SALE.COMPLETED':
                await this.handlePaymentSaleCompleted(body);
                break;

            case 'BILLING.SUBSCRIPTION.CANCELLED':
            case 'BILLING.SUBSCRIPTION.EXPIRED':
            case 'BILLING.SUBSCRIPTION.SUSPENDED':
                await this.handleSubscriptionIssue(body);
                break;

            case 'PAYMENT.CAPTURE.COMPLETED':
                this.logger.log(`Payment captured: ${JSON.stringify({
                    captureId: body.resource?.id,
                    orderId: body.resource?.supplementary_data?.related_ids?.order_id,
                    amount: body.resource?.amount,
                })}`);
                break;

            default:
                this.logger.log(`Unhandled event type: ${eventType}`);
        }

        return { status: 'OK' };
    }

    /**
     * Handle CHECKOUT.ORDER.APPROVED event.
     * Finds the PendingRegistration by paypalOrderId and triggers the full
     * confirmation flow (capture payment → create tenant → create admin user).
     * Idempotent: if the registration was already processed, it logs and skips.
     */
    private async handleOrderApproved(body: any) {
        // ... (existing code for backward compatibility)
        const orderId = body.resource?.id;
        if (!orderId) return;
        try {
            const registration = await this.registrationsService.findByPaypalOrderId(orderId);
            if (!registration || registration.status !== 'PENDING') return;
            await this.registrationsService.confirmPayment(registration.id, orderId);
        } catch (err) {
            this.logger.error(`Webhook processing failed for order ${orderId}: ${err.message}`);
        }
    }

    private async handleSubscriptionActivated(body: any) {
        const subscriptionId = body.resource?.id;
        const customId = body.resource?.custom_id; // Registration ID
        if (!subscriptionId || !customId) return;

        this.logger.log(`Subscription activated via webhook: ${subscriptionId} for registration ${customId}`);

        try {
            await this.registrationsService.confirmPayment(customId, subscriptionId);
        } catch (err) {
            this.logger.error(`Webhook processing failed for subscription ${subscriptionId}: ${err.message}`);
        }
    }

    private async handlePaymentSaleCompleted(body: any) {
        const subscriptionId = body.resource?.billing_agreement_id;
        if (!subscriptionId) return;

        this.logger.log(`Payment sale completed for subscription: ${subscriptionId}`);
        // Here we would extend the period end in the Subscription table
        // For now, it will be handled when the next period start is detected
    }

    private async handleSubscriptionUpdated(body: any) {
        const subscriptionId = body.resource?.id;
        const planId = body.resource?.plan_id;
        if (!subscriptionId || !planId) return;

        this.logger.log(`Subscription updated via webhook: ${subscriptionId} now on plan ${planId}`);

        try {
            await this.registrationsService.syncSubscriptionPlan(subscriptionId, planId);
        } catch (err) {
            this.logger.error(`Webhook processing failed for subscription update ${subscriptionId}: ${err.message}`);
        }
    }

    private async handleSubscriptionIssue(body: any) {
        const subscriptionId = body.resource?.id;
        const eventType = body.event_type;
        this.logger.warn(`Subscription status issue: ${eventType} - ${subscriptionId}`);

        let status = 'CANCELLED';
        if (eventType.includes('SUSPENDED')) status = 'PAUSED';
        if (eventType.includes('EXPIRED')) status = 'PAST_DUE';

        await this.registrationsService.updateSubscriptionStatus(subscriptionId, status);
    }
}
