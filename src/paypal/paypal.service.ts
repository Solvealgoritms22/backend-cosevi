import { Injectable, Logger } from '@nestjs/common';

interface PayPalOrderResponse {
    id: string;
    status: string;
    links: Array<{ href: string; rel: string; method: string }>;
}

@Injectable()
export class PayPalService {
    private readonly logger = new Logger(PayPalService.name);
    private readonly baseUrl: string;
    private readonly clientId: string;
    private readonly clientSecret: string;

    constructor() {
        const mode = process.env.PAYPAL_MODE || 'sandbox';
        this.baseUrl = mode === 'live'
            ? 'https://api-m.paypal.com'
            : 'https://api-m.sandbox.paypal.com';
        this.clientId = process.env.PAYPAL_CLIENT_ID || '';
        this.clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
    }

    private async getAccessToken(): Promise<string> {
        const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

        const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        });

        if (!response.ok) {
            const error = await response.text();
            this.logger.error(`PayPal auth failed: ${error}`);
            throw new Error(`PayPal authentication failed: ${response.status}`);
        }

        const data = await response.json();
        return data.access_token;
    }

    async createOrder(
        plan: string,
        amount: number,
        pendingRegistrationId: string,
    ): Promise<PayPalOrderResponse> {
        const accessToken = await this.getAccessToken();
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        try {
            const response = await fetch(`${this.baseUrl}/v2/checkout/orders`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            reference_id: pendingRegistrationId,
                            description: `ENTRAR - Plan ${plan.charAt(0).toUpperCase() + plan.slice(1)} (Mensual)`,
                            amount: {
                                currency_code: 'USD',
                                value: amount.toFixed(2),
                            },
                        },
                    ],
                    application_context: {
                        brand_name: 'ENTRAR',
                        landing_page: 'NO_PREFERENCE',
                        user_action: 'PAY_NOW',
                        return_url: `${frontendUrl}/payment-success?registration=${pendingRegistrationId}`,
                        cancel_url: `${frontendUrl}/payment-cancelled?registration=${pendingRegistrationId}`,
                    },
                }),
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                const error = await response.text();
                this.logger.error(`PayPal create order failed: ${error}`);
                throw new Error(`PayPal create order failed: ${response.status}`);
            }

            const data = await response.json();
            this.logger.log(`PayPal order created: ${data.id} for registration ${pendingRegistrationId}`);
            return data;
        } catch (error: any) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('PayPal request timed out');
            }
            throw error;
        }
    }

    async captureOrder(orderId: string): Promise<any> {
        const accessToken = await this.getAccessToken();

        const response = await fetch(`${this.baseUrl}/v2/checkout/orders/${orderId}/capture`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.text();
            this.logger.error(`PayPal capture failed: ${error}`);
            throw new Error(`PayPal capture failed: ${response.status}`);
        }

        const data = await response.json();
        this.logger.log(`PayPal order captured: ${orderId}, status: ${data.status}`);
        return data;
    }

    async getOrderDetails(orderId: string): Promise<any> {
        const accessToken = await this.getAccessToken();

        const response = await fetch(`${this.baseUrl}/v2/checkout/orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const error = await response.text();
            this.logger.error(`PayPal get order failed: ${error}`);
            throw new Error(`PayPal get order failed: ${response.status}`);
        }

        return response.json();
    }

    async verifyWebhookSignature(
        headers: Record<string, string>,
        body: string,
    ): Promise<boolean> {
        const accessToken = await this.getAccessToken();
        const webhookId = process.env.PAYPAL_WEBHOOK_ID;

        if (!webhookId) {
            this.logger.warn('PAYPAL_WEBHOOK_ID not configured, skipping verification');
            return true; // In development, skip verification
        }

        const response = await fetch(`${this.baseUrl}/v1/notifications/verify-webhook-signature`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                auth_algo: headers['paypal-auth-algo'],
                cert_url: headers['paypal-cert-url'],
                transmission_id: headers['paypal-transmission-id'],
                transmission_sig: headers['paypal-transmission-sig'],
                transmission_time: headers['paypal-transmission-time'],
                webhook_id: webhookId,
                webhook_event: JSON.parse(body),
            }),
        });

        if (!response.ok) {
            this.logger.error('Webhook signature verification failed');
            return false;
        }

        const data = await response.json();
        return data.verification_status === 'SUCCESS';
    }
}
