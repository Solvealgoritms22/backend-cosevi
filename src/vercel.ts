import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { setupApp } from './setup';
import express from 'express';

let cachedServer: any;

async function bootstrapServer(): Promise<any> {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp),
        );
        setupApp(nestApp);
        await nestApp.init();
        cachedServer = expressApp;
    }
    return cachedServer;
}

export default async (req: any, res: any) => {
    const server = await bootstrapServer();
    server(req, res);
};
