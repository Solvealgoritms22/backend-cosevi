import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { setupApp } from './setup';
import express from 'express';

let cachedServer: any;

async function bootstrapServer(): Promise<any> {
    if (!cachedServer) {
        try {
            const expressApp = express();
            const nestApp = await NestFactory.create(
                AppModule,
                new ExpressAdapter(expressApp),
                { logger: ['error', 'warn'] } // Reduce noise, focus on errors
            );
            setupApp(nestApp);
            await nestApp.init();
            cachedServer = expressApp;
        } catch (error) {
            console.error('SERVER BOOTSTRAP ERROR:', error);
            throw error;
        }
    }
    return cachedServer;
}

export default async (req: any, res: any) => {
    try {
        const server = await bootstrapServer();
        return server(req, res);
    } catch (error) {
        console.error('HANDLER ERROR:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error)
        });
    }
};
