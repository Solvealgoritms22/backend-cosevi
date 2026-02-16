import { Injectable, Logger } from '@nestjs/common';
import Pusher from 'pusher';

@Injectable()
export class PusherService {
    private pusher: Pusher;
    private readonly logger = new Logger(PusherService.name);

    constructor() {
        const appId = process.env.PUSHER_APP_ID;
        const key = process.env.PUSHER_KEY;
        const secret = process.env.PUSHER_SECRET;
        const cluster = process.env.PUSHER_CLUSTER;

        if (!appId || !key || !secret || !cluster) {
            this.logger.warn('Pusher environment variables are missing. Real-time features will be disabled.');
            return;
        }

        this.pusher = new Pusher({
            appId,
            key,
            secret,
            cluster,
            useTLS: true,
        });
    }

    async trigger(channel: string, event: string, data: any) {
        if (!this.pusher) {
            this.logger.warn('Pusher is not initialized. Skipping event trigger.');
            return;
        }
        try {
            await this.pusher.trigger(channel, event, data);
            this.logger.log(`Pusher event triggered: ${event} on channel ${channel}`);
        } catch (error) {
            this.logger.error(`Failed to trigger Pusher event: ${error.message}`, error.stack);
        }
    }
}
