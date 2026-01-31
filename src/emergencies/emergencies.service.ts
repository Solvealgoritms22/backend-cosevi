import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';

import { AppGateway } from '../app.gateway';
import { PushNotificationsService } from '../notifications/push-notifications.service';

import { Role } from '@prisma/client';

@Injectable()
export class EmergenciesService {
    constructor(
        private prisma: PrismaService,
        private gateway: AppGateway,
        private pushNotifications: PushNotificationsService
    ) { }

    async create(userId: string, createEmergencyDto: CreateEmergencyDto) {
        const emergency = await this.prisma.emergencyAlert.create({
            data: {
                ...createEmergencyDto,
                senderId: userId,
                status: 'ACTIVE',
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                        email: true,
                    },
                },
            },
        });

        // Emit real-time event (Socket.io)
        this.gateway.server.emit('emergencyAlert', emergency);

        // Send Push Notifications
        const senderRole = emergency.sender.role;
        let targetRoles: Role[] = [];

        if (senderRole === 'RESIDENT') {
            targetRoles = ['SECURITY', 'ADMIN'];
        } else if (senderRole === 'SECURITY' || senderRole === 'ADMIN') {
            targetRoles = ['RESIDENT'];
        }

        if (targetRoles.length > 0) {
            const title = `⚠️ ${emergency.type.toUpperCase().replace('_', ' ')} ALERT`;
            const body = `${senderRole === 'RESIDENT' ? `Resident ${emergency.sender.name}` : 'Security authority'} is reporting an emergency at ${emergency.location || 'Unknown Location'}.`;

            this.pushNotifications.sendToRoles(targetRoles, title, body, {
                emergencyId: emergency.id,
                type: emergency.type,
                location: emergency.location || 'Unknown'
            }).catch(err => console.error('Push notification failed:', err));
        }

        return emergency;
    }

    async findAll() {
        return this.prisma.emergencyAlert.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                sender: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    async resolve(id: string) {
        return this.prisma.emergencyAlert.update({
            where: { id },
            data: { status: 'RESOLVED' },
        });
    }
}
