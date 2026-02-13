import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import helmet from 'helmet';

let cachedServer: any;

async function bootstrapServer() {
    if (!cachedServer) {
        const expressApp = express();
        const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

        // Security Hardening
        app.use(helmet({
            crossOriginEmbedderPolicy: false,
            crossOriginResourcePolicy: { policy: 'cross-origin' },
        }));

        app.enableCors({
            origin: (origin, callback) => {
                const allowedOrigins = [
                    'https://frontend-cosevi.vercel.app',
                    'http://localhost:3000',
                    'http://localhost:3001',
                    'http://localhost:4200',
                ];
                const allowed = !origin ||
                    allowedOrigins.includes(origin) ||
                    origin.endsWith('.vercel.app') ||
                    /^http:\/\/localhost:\d+$/.test(origin);

                if (allowed) {
                    callback(null, true);
                } else {
                    console.warn(`Blocked CORS request from origin: ${origin}`);
                    callback(new Error('Not allowed by CORS'));
                }
            },
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-tenant-id'],
        });

        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }));

        await app.init();
        cachedServer = expressApp;
    }
    return cachedServer;
}

export default async function (req, res) {
    const server = await bootstrapServer();
    return server(req, res);
}
