import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class IotService {
    constructor(private prisma: PrismaService) { }

    // --- Device Management ---

    async registerDevice(data: { name: string; type: string; location?: string }) {
        return this.prisma.hardwareDevice.create({
            data: {
                ...data,
                status: 'ONLINE',
                lastSeen: new Date(),
            },
        });
    }

    async getDevices() {
        return this.prisma.hardwareDevice.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                events: { take: 5, orderBy: { timestamp: 'desc' } },
            },
        });
    }

    async getDeviceById(id: string) {
        return this.prisma.hardwareDevice.findUnique({
            where: { id },
        });
    }

    async updateHeartbeat(deviceId: string) {
        return this.prisma.hardwareDevice.update({
            where: { id: deviceId },
            data: {
                lastSeen: new Date(),
                status: 'ONLINE',
            },
        });
    }

    // --- Command Handling ---

    async sendCommand(deviceId: string, command: string, payload?: any) {
        return this.prisma.iotCommand.create({
            data: {
                deviceId,
                command,
                payload,
                status: 'PENDING',
            },
        });
    }

    async pollCommands(deviceId: string) {
        // 1. Update heartbeat
        await this.updateHeartbeat(deviceId).catch(() => null); // Ignore error if device not found (auto-register?)

        // 2. Fetch pending commands
        const commands = await this.prisma.iotCommand.findMany({
            where: {
                deviceId,
                status: 'PENDING',
            },
            orderBy: { createdAt: 'asc' },
        });

        // 3. Mark as SENT? Or keep PENDING until ACK?
        // Let's keep PENDING until ACK to ensure delivery.
        // But if we poll frequently, we might get the same command.
        // Let's mark as SENT.
        if (commands.length > 0) {
            await this.prisma.iotCommand.updateMany({
                where: { id: { in: commands.map(c => c.id) } },
                data: { status: 'SENT' },
            });
        }

        return commands;
    }

    async ackCommand(commandId: string) {
        return this.prisma.iotCommand.update({
            where: { id: commandId },
            data: { status: 'COMPLETED' },
        });
    }

    // --- Event Handling (Inbound) ---

    async logEvent(deviceId: string, type: string, data?: any) {
        return this.prisma.hardwareEvent.create({
            data: {
                deviceId,
                type,
                data,
                timestamp: new Date(),
            },
        });
    }
}
