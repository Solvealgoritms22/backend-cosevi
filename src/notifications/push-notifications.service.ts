import { Injectable, Logger } from '@nestjs/common';
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class PushNotificationsService {
    private expo = new Expo();
    private readonly logger = new Logger(PushNotificationsService.name);

    constructor(private prisma: PrismaService) { }

    async sendToRoles(
        roles: Role[],
        title: string,
        body: string,
        data?: any,
    ): Promise<ExpoPushTicket[]> {
        const users = await this.prisma.user.findMany({
            where: {
                role: { in: roles },
                pushToken: { not: null },
                pushNotificationsEnabled: true,
            },
            select: { pushToken: true },
        });

        const messages: ExpoPushMessage[] = [];
        for (const user of users) {
            if (!Expo.isExpoPushToken(user.pushToken)) {
                this.logger.error(
                    `Push token ${user.pushToken} is not a valid Expo push token`,
                );
                continue;
            }
            messages.push({
                to: user.pushToken,
                sound: 'default',
                title,
                body,
                data,
                priority: 'high',
            });
        }

        const chunks = this.expo.chunkPushNotifications(messages);
        const tickets: ExpoPushTicket[] = [];

        for (const chunk of chunks) {
            try {
                const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                this.logger.error('Error sending push notification chunk:', error);
            }
        }

        return tickets;
    }
}
