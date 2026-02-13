const nodemailer = require('nodemailer');
const dns = require('dns');

// Hardcoded values from .env for diagnostic purposes
const config = {
    host: 'smtp.gmail.com',
    port: 587,
    user: 'darlingf1998@gmail.com',
    pass: 'btyw kdyf gisq wrgj' // App password
};

async function testEmail() {
    console.log('Starting diagnostic email test...');
    console.log('Config:', {
        host: config.host,
        port: config.port,
        user: config.user
    });

    const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: false,
        auth: {
            user: config.user,
            pass: config.pass,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
        family: 4,
        dns: {
            lookup: (hostname, options, callback) => {
                dns.lookup(hostname, { family: 4 }, callback);
            }
        },
        debug: true,
        logger: true
    });

    try {
        console.log('Verifying connection...');
        await transporter.verify();
        console.log('Connection verified successfully!');

        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: `"ENTRA DIAGNOSTIC" <${config.user}>`,
            to: config.user,
            subject: 'Diagnostic Email - ENTRA Backend',
            text: 'This is a diagnostic email to verify SMTP configuration.',
            html: '<b>This is a diagnostic email to verify SMTP configuration.</b>',
        });

        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
    } catch (error) {
        console.error('Email diagnostic failed:');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        if (error.response) console.error('SMTP Response:', error.response);
        // console.error('Full error:', error);
    }
}

testEmail();
