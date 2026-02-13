import { Injectable, Logger } from '@nestjs/common';
import Pusher from 'pusher';

@Injectable()
export class PusherService {
    private pusher: Pusher;
    private readonly logger = new Logger(PusherService.name);

    constructor() {
        this.pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID!,
            key: process.env.PUSHER_KEY!,
            secret: process.env.PUSHER_SECRET!,
            cluster: process.env.PUSHER_CLUSTER!,
            useTLS: true,
        });
    }

    async trigger(channel: string, event: string, data: any) {
        try {
            await this.pusher.trigger(channel, event, data);
            this.logger.log(`Pusher event triggered: ${event} on channel ${channel}`);
        } catch (error) {
            this.logger.error(`Failed to trigger Pusher event: ${error.message}`, error.stack);
        }
    }
}
