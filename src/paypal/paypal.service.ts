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

        this.logger.log(`Attempting to capture PayPal order: ${orderId}`);
        const response = await fetch(`${this.baseUrl}/v2/checkout/orders/${orderId}/capture`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle specific case where order is already captured (e.g. by webhook)
            if (response.status === 422 && data.details?.some((d: any) => d.issue === 'ORDER_ALREADY_CAPTURED')) {
                this.logger.warn(`PayPal order ${orderId} was already captured. Fetching current status.`);
                return this.getOrderDetails(orderId);
            }

            this.logger.error(`PayPal capture failed: ${JSON.stringify(data)}`);
            throw new Error(`PayPal capture failed: ${response.status}`);
        }

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

    async createSubscription(
        planId: string,
        customId: string,
    ): Promise<any> {
        const accessToken = await this.getAccessToken();
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';

        const response = await fetch(`${this.baseUrl}/v1/billing/subscriptions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                plan_id: planId,
                custom_id: customId,
                application_context: {
                    brand_name: 'ENTRAR',
                    locale: 'es-ES',
                    shipping_preference: 'NO_SHIPPING',
                    user_action: 'SUBSCRIBE_NOW',
                    return_url: `${frontendUrl}/payment-success?registration=${customId}`,
                    cancel_url: `${frontendUrl}/payment-cancelled?registration=${customId}`,
                }
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            this.logger.error(`PayPal create subscription failed: ${error}`);
            throw new Error(`PayPal create subscription failed: ${response.status}`);
        }

        return response.json();
    }

    async getSubscriptionDetails(subscriptionId: string): Promise<any> {
        const accessToken = await this.getAccessToken();

        const response = await fetch(`${this.baseUrl}/v1/billing/subscriptions/${subscriptionId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const error = await response.text();
            this.logger.error(`PayPal get subscription failed: ${error}`);
            throw new Error(`PayPal get subscription failed: ${response.status}`);
        }

        return response.json();
    }

    async reviseSubscription(subscriptionId: string, planId: string): Promise<any> {
        const accessToken = await this.getAccessToken();

        this.logger.log(`Attempting to revise PayPal subscription: ${subscriptionId} to plan ${planId}`);
        const response = await fetch(`${this.baseUrl}/v1/billing/subscriptions/${subscriptionId}/revise`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plan_id: planId,
                application_context: {
                    return_url: `${process.env.FRONTEND_URL}/billing?upgrade=success`,
                    cancel_url: `${process.env.FRONTEND_URL}/billing?upgrade=cancel`,
                }
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            this.logger.error(`PayPal revise subscription failed for ${subscriptionId}: ${response.status} - ${JSON.stringify(data)}`);
            throw new Error(`PayPal revise subscription failed: ${response.status}`);
        }

        return data;
    }

    async cancelSubscription(subscriptionId: string, reason: string): Promise<void> {
        const accessToken = await this.getAccessToken();

        this.logger.log(`Attempting to cancel PayPal subscription: ${subscriptionId}`);
        const response = await fetch(`${this.baseUrl}/v1/billing/subscriptions/${subscriptionId}/cancel`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reason: reason || 'Customer requested cancellation',
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            this.logger.error(`PayPal cancel subscription failed for ${subscriptionId}: ${response.status} - ${error}`);
            throw new Error(`PayPal cancel subscription failed: ${response.status}`);
        }

        this.logger.log(`PayPal subscription cancelled: ${subscriptionId}`);
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

    async createProduct(name: string, description: string): Promise<any> {
        const accessToken = await this.getAccessToken();
        const response = await fetch(`${this.baseUrl}/v1/catalogs/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                type: 'SERVICE',
                category: 'SOFTWARE',
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            this.logger.error(`PayPal create product failed: ${error}`);
            throw new Error(`PayPal create product failed: ${response.status}`);
        }

        return response.json();
    }

    async createPlan(productId: string, name: string, description: string, price: number): Promise<any> {
        const accessToken = await this.getAccessToken();
        const response = await fetch(`${this.baseUrl}/v1/billing/plans`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: productId,
                name,
                description,
                status: 'ACTIVE',
                billing_cycles: [
                    {
                        frequency: {
                            interval_unit: 'MONTH',
                            interval_count: 1,
                        },
                        tenure_type: 'REGULAR',
                        sequence: 1,
                        total_cycles: 0, // 0 = Infinite
                        pricing_scheme: {
                            fixed_price: {
                                value: price.toFixed(2),
                                currency_code: 'USD',
                            },
                        },
                    },
                ],
                payment_preferences: {
                    auto_bill_outstanding: true,
                    setup_fee_failure_action: 'CONTINUE',
                    payment_failure_threshold: 3,
                },
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            this.logger.error(`PayPal create plan failed: ${error}`);
            throw new Error(`PayPal create plan failed: ${response.status}`);
        }

        return response.json();
    }

    async listProducts(): Promise<any> {
        const accessToken = await this.getAccessToken();
        const response = await fetch(`${this.baseUrl}/v1/catalogs/products`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.json();
    }
}
