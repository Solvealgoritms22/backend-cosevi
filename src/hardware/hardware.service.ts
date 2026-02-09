import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HardwareService {
    constructor(private prisma: PrismaService) { }

    async registerDevice(data: { name: string; type: string; location?: string }) {
        return (this.prisma as any).hardwareDevice.create({
            data,
        });
    }

    async logEvent(deviceId: string, type: string, data: any) {
        const device = await (this.prisma as any).hardwareDevice.findUnique({
            where: { id: deviceId },
        });

        if (!device) {
            throw new NotFoundException(`Device with ID ${deviceId} not found`);
        }

        return (this.prisma as any).hardwareEvent.create({
            data: {
                deviceId,
                type,
                data,
            },
        });
    }

    async getLatestEvents() {
        return (this.prisma as any).hardwareEvent.findMany({
            take: 20,
            orderBy: { timestamp: 'desc' },
            include: { device: true },
        });
    }

    async getDevices() {
        return (this.prisma as any).hardwareDevice.findMany();
    }
}
