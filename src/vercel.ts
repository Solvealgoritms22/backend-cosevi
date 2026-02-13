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
            console.log('Initializing NestJS application...');
            const expressApp = express();
            const nestApp = await NestFactory.create(
                AppModule,
                new ExpressAdapter(expressApp),
                { logger: ['error', 'warn', 'log', 'debug', 'verbose'] } // Enable full logging for debugging
            );
            setupApp(nestApp);
            await nestApp.init();
            cachedServer = expressApp;
            console.log('NestJS application initialized successfully.');
        } catch (error) {
            console.error('SERVER BOOTSTRAP ERROR:', error);
            // Re-throw so the handler catches it and returns 500 with details
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
        // Return JSON error response for debugging
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to start application',
            details: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
        });
    }
};
