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

            case 'PAYMENT.CAPTURE.COMPLETED':
                this.logger.log(`Payment captured: ${JSON.stringify({
                    captureId: body.resource?.id,
                    orderId: body.resource?.supplementary_data?.related_ids?.order_id,
                    amount: body.resource?.amount,
                })}`);
                break;

            case 'PAYMENT.CAPTURE.DENIED':
            case 'PAYMENT.CAPTURE.REFUNDED':
                this.logger.warn(`Payment issue: ${eventType} - ${body.resource?.id}`);
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
        const orderId = body.resource?.id;
        if (!orderId) {
            this.logger.error('CHECKOUT.ORDER.APPROVED: missing order ID');
            return;
        }

        this.logger.log(`Order approved via webhook: ${orderId}`);

        try {
            // Find the pending registration by PayPal order ID
            const registration = await this.registrationsService.findByPaypalOrderId(orderId);

            if (!registration) {
                this.logger.warn(`No pending registration found for PayPal order: ${orderId}`);
                return;
            }

            // Skip if already processed (idempotent)
            if (registration.status !== 'PENDING') {
                this.logger.log(`Registration ${registration.id} already processed (status: ${registration.status}), skipping webhook`);
                return;
            }

            // Trigger the full confirmation flow
            const result = await this.registrationsService.confirmPayment(registration.id, orderId);
            this.logger.log(`Webhook successfully processed registration ${registration.id}: ${JSON.stringify(result)}`);
        } catch (err) {
            this.logger.error(`Webhook processing failed for order ${orderId}: ${err.message}`);
        }
    }
}
