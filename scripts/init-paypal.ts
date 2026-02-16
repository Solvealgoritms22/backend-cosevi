import * as dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const mode = process.env.PAYPAL_MODE || 'sandbox';
const baseUrl = mode === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });
    const data = await response.json();
    return data.access_token;
}

async function run() {
    console.log('--- PayPal Initialization Script ---');
    if (!clientId || !clientSecret) {
        console.error('Error: PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET missing in .env');
        return;
    }

    try {
        const token = await getAccessToken();
        console.log('Authenticated with PayPal successfully.');

        // 1. Create Product
        console.log('Checking for ENTRAR product...');
        const productsRes = await fetch(`${baseUrl}/v1/catalogs/products`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const productsData = await productsRes.json();
        let product = productsData.products?.find((p: any) => p.name === 'ENTRAR');

        if (!product) {
            console.log('Product ENTRAR not found. Creating...');
            const createProdRes = await fetch(`${baseUrl}/v1/catalogs/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'ENTRAR',
                    description: 'Servicios de Seguridad y Gestión Residencial',
                    type: 'SERVICE',
                    category: 'SOFTWARE'
                })
            });
            product = await createProdRes.json();
            console.log(`Created Product: ${product.id}`);
        } else {
            console.log(`Using existing Product: ${product.id}`);
        }

        // 2. Create Plans
        const tiers = [
            { name: 'Starter', price: 49 },
            { name: 'Premium', price: 129 },
            { name: 'Elite', price: 299 }
        ];

        console.log('Creating plans...');
        const results: any = {};

        for (const tier of tiers) {
            const planRes = await fetch(`${baseUrl}/v1/billing/plans`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: product.id,
                    name: `Plan ${tier.name}`,
                    description: `Suscripción mensual al plan ${tier.name}`,
                    status: 'ACTIVE',
                    billing_cycles: [{
                        frequency: { interval_unit: 'MONTH', interval_count: 1 },
                        tenure_type: 'REGULAR',
                        sequence: 1,
                        total_cycles: 0,
                        pricing_scheme: {
                            fixed_price: { value: tier.price.toFixed(2), currency_code: 'USD' }
                        }
                    }],
                    payment_preferences: {
                        auto_bill_outstanding: true,
                        setup_fee_failure_action: 'CONTINUE',
                        payment_failure_threshold: 3
                    }
                })
            });
            const planData = await planRes.json();
            results[tier.name.toLowerCase()] = planData.id;
            console.log(`- ${tier.name}: ${planData.id}`);
        }

        console.log('\n--- SUCCESS ---');
        console.log('Add these to your .env file:');
        console.log(`PAYPAL_STARTER_PLAN_ID=${results.starter}`);
        console.log(`PAYPAL_PREMIUM_PLAN_ID=${results.premium}`);
        console.log(`PAYPAL_ELITE_PLAN_ID=${results.elite}`);

    } catch (error) {
        console.error('Initialization failed:', error);
    }
}

run();
