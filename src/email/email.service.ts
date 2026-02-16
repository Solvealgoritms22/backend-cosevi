import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dns from 'dns';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        console.log('Email Service Config:', {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            user: process.env.EMAIL_USER,
            hasPass: !!process.env.EMAIL_PASS
        });
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            connectionTimeout: 10000,
            greetingTimeout: 5000,
            socketTimeout: 10000,
            // Force IPv4 lookup
            family: 4,
            dns: {
                lookup: (hostname, options, callback) => {
                    dns.lookup(hostname, { family: 4 }, callback);
                }
            }
        } as nodemailer.TransportOptions);
    }

    async sendPaymentLink(to: string, name: string, paymentUrl: string, plan: string, amount: number, expiresAt: Date) {
        const expiresFormatted = expiresAt.toLocaleDateString('es-ES', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });

        console.log(`Attempting to send payment link to ${to}...`);
        try {
            const info = await this.transporter.sendMail({
                from: `"ENTRAR" <${process.env.EMAIL_USER}>`,
                to,
                subject: 'Completa tu suscripción - ENTRAR',
                html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
                    <div style="background: #1e293b; padding: 32px; text-align: center;">
                        <img src="${process.env.FRONTEND_URL || 'https://frontend-cosevi.vercel.app'}/logo-official.png" alt="ENTRA" style="height: 60px; margin-bottom: 8px;">
                        <p style="color: #e0e7ff; margin: 4px 0 0; font-size: 14px; font-weight: 500; letter-spacing: 0.5px;">Sistema de Control de Acceso</p>
                    </div>
                    <div style="padding: 32px;">
                        <h2 style="color: #1e293b; margin: 0 0 16px;">¡Hola ${name}!</h2>
                        <p style="color: #475569; line-height: 1.6;">
                            Tu registro ha sido recibido. Para activar tu cuenta, completa el pago de tu suscripción.
                        </p>
                        <div style="background: white; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid #e2e8f0;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b;">Plan:</td>
                                    <td style="padding: 8px 0; color: #1e293b; font-weight: 600; text-align: right; text-transform: capitalize;">${plan}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b;">Monto mensual:</td>
                                    <td style="padding: 8px 0; color: #1e293b; font-weight: 600; text-align: right;">$${amount.toFixed(2)} USD</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b;">Válido hasta:</td>
                                    <td style="padding: 8px 0; color: #ef4444; font-weight: 600; text-align: right;">${expiresFormatted}</td>
                                </tr>
                            </table>
                        </div>
                        <div style="text-align: center; margin: 32px 0;">
                            <a href="${paymentUrl}" style="background: #005f9fff; color: white; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-flex; align-items: center; gap: 10px;">
                                <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" style="height: 20px; vertical-align: middle; margin-right: 8px;">
                                Pagar con PayPal
                            </a>
                        </div>
                        <p style="color: #94a3b8; font-size: 13px; text-align: center;">
                            Este enlace expira el ${expiresFormatted}. Si no realizas el pago antes de esa fecha, 
                            deberás completar el formulario de registro nuevamente.
                        </p>
                    </div>
                    <div style="background: #1e293b; padding: 20px; text-align: center;">
                        <p style="color: #94a3b8; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} ENTRAR. Todos los derechos reservados.</p>
                    </div>
                </div>
            `,
            });
            console.log(`Payment link sent to ${to}: ${info.messageId}`);
        } catch (error) {
            console.error(`Error sending payment link to ${to}:`, error);
            throw error;
        }
    }

    async sendWelcome(to: string, name: string, plan: string) {
        console.log(`Attempting to send welcome email to ${to}...`);
        try {
            const info = await this.transporter.sendMail({
                from: `"ENTRA" <${process.env.EMAIL_USER}>`,
                to,
                subject: '¡Bienvenido a ENTRA!',
                html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #007e56ff, #06ac75ff); padding: 32px; text-align: center;">
                        <img src="${process.env.FRONTEND_URL || 'https://frontend-cosevi.vercel.app'}/logo-official.png" alt="ENTRA" style="height: 60px; margin-bottom: 8px;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">🎉 ¡Bienvenido!</h1>
                    </div>
                    <div style="padding: 32px;">
                        <h2 style="color: #1e293b; margin: 0 0 16px;">Hola ${name},</h2>
                        <p style="color: #475569; line-height: 1.6;">
                            Tu pago ha sido procesado exitosamente y tu cuenta con plan <strong style="text-transform: capitalize;">${plan}</strong> está activa.
                        </p>
                        <p style="color: #475569; line-height: 1.6;">
                            Ya puedes iniciar sesión y comenzar a configurar tu sistema de gestión residencial.
                        </p>
                        <div style="text-align: center; margin: 32px 0;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:3001'}/login" style="background: linear-gradient(135deg, #007e56ff, #06ac75ff); color: white; padding: 14px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">
                                Iniciar Sesión
                            </a>
                        </div>
                    </div>
                    <div style="background: #1e293b; padding: 20px; text-align: center;">
                        <p style="color: #94a3b8; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} ENTRA. Todos los derechos reservados.</p>
                    </div>
                </div>
            `,
            });
            console.log(`Welcome email sent to ${to}: ${info.messageId}`);
        } catch (error) {
            console.error(`Error sending welcome email to ${to}:`, error);
            throw error;
        }
    }

    async sendInvoice(to: string, name: string, invoice: {
        planAmount: number;
        overageAmount: number;
        totalAmount: number;
        billingPeriod: string;
        details: any;
    }) {
        let overageRows = '';
        if (invoice.details) {
            const resources = ['units', 'parking', 'monitors', 'security'];
            const labels: Record<string, string> = {
                units: 'Unidades/Residentes',
                parking: 'Espacios de Parqueo',
                monitors: 'Administradores',
                security: 'Guardias de Seguridad',
            };
            for (const r of resources) {
                const d = invoice.details[r];
                if (d && d.extra > 0) {
                    overageRows += `
                        <tr>
                            <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; color: #475569;">
                                ${labels[r]} extra (${d.extra})
                            </td>
                            <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; color: #1e293b; text-align: right;">
                                $${d.cost.toFixed(2)}
                            </td>
                        </tr>
                    `;
                }
            }
        }

        console.log(`Attempting to send invoice to ${to}...`);
        try {
            const info = await this.transporter.sendMail({
                from: `"ENTRA" <${process.env.EMAIL_USER}>`,
                to,
                subject: `📄 Factura ENTRA - ${invoice.billingPeriod}`,
                html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 32px; text-align: center;">
                        <img src="${process.env.FRONTEND_URL || 'https://frontend-cosevi.vercel.app'}/logo-official.png" alt="ENTRA" style="height: 60px; margin-bottom: 8px;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">📄 Factura Mensual</h1>
                        <p style="color: #e0e7ff; margin: 8px 0 0;">${invoice.billingPeriod}</p>
                    </div>
                    <div style="padding: 32px;">
                        <p style="color: #475569;">Hola ${name}, aquí tienes el detalle de tu factura:</p>
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <tr style="background: #f1f5f9;">
                                <td style="padding: 10px 12px; font-weight: 600; color: #1e293b;">Concepto</td>
                                <td style="padding: 10px 12px; font-weight: 600; color: #1e293b; text-align: right;">Monto</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; color: #475569;">Plan base</td>
                                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; color: #1e293b; text-align: right;">$${invoice.planAmount.toFixed(2)}</td>
                            </tr>
                            ${overageRows}
                            <tr style="background: #f1f5f9;">
                                <td style="padding: 12px; font-weight: 700; color: #1e293b; font-size: 16px;">TOTAL</td>
                                <td style="padding: 12px; font-weight: 700; color: #4f46e5; text-align: right; font-size: 16px;">$${invoice.totalAmount.toFixed(2)}</td>
                            </tr>
                        </table>
                    </div>
                    <div style="background: #1e293b; padding: 20px; text-align: center;">
                        <p style="color: #94a3b8; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} ENTRA. Todos los derechos reservados.</p>
                    </div>
                </div>
            `,
            });
            console.log(`Invoice sent to ${to}: ${info.messageId}`);
        } catch (error) {
            console.error(`Error sending invoice to ${to}:`, error);
            throw error;
        }
    }
}
