require('dotenv').config();
const fetch = require('node-fetch');

async function testPayPal() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const mode = process.env.PAYPAL_MODE || 'sandbox';
    const baseUrl = mode === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

    console.log('Testing PayPal integration...');
    console.log(`Mode: ${mode}`);
    console.log(`Client ID: ${clientId ? 'Present' : 'MISSING'}`);
    console.log(`Client Secret: ${clientSecret ? 'Present' : 'MISSING'}`);

    if (!clientId || !clientSecret) {
        console.error('PayPal credentials missing from .env');
        return;
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        });

        if (!response.ok) {
            const error = await response.text();
            console.error(`PayPal auth failed (HTTP ${response.status}): ${error}`);
            return;
        }

        const data = await response.json();
        console.log('PayPal authentication SUCCESSFUL');
        console.log(`Access Token: ${data.access_token.substring(0, 10)}...`);

    } catch (error) {
        console.error('Error connecting to PayPal:', error);
    }
}

testPayPal();
