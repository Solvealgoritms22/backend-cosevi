import { Injectable } from '@nestjs/common';
import { AppGateway } from '../app.gateway';
import { PrismaService } from '../prisma.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Injectable()
export class VisitsService {
    constructor(
        private prisma: PrismaService,
        private gateway: AppGateway,
    ) { }

    async create(createVisitDto: CreateVisitDto) {
        if (createVisitDto.spaceId) {
            const space = await this.prisma.space.findUnique({
                where: { id: createVisitDto.spaceId },
            });
            if (!space) {
                throw new Error('Space not found');
            }
            if (space.status !== 'AVAILABLE') {
                throw new Error('Selected space is not available');
            }

            const activeVisit = await this.prisma.visit.findFirst({
                where: {
                    spaceId: createVisitDto.spaceId,
                    status: { in: ['PENDING', 'APPROVED', 'CHECKED_IN'] },
                },
            });

            if (activeVisit) {
                throw new Error('Selected space is currently in use');
            }
        }

        const visitor = await this.prisma.visitor.upsert({
            where: { idNumber: createVisitDto.visitorIdNumber || 'N/A' },
            update: { name: createVisitDto.visitorName },
            create: {
                idNumber: createVisitDto.visitorIdNumber || 'N/A',
                name: createVisitDto.visitorName,
            },
        });

        let accessCode = '';
        let isUnique = false;
        while (!isUnique) {
            accessCode = Math.floor(1000 + Math.random() * 9000).toString();
            const existing = await this.prisma.visit.findUnique({ where: { accessCode } });
            if (!existing) isUnique = true;
        }

        const newVisit = await this.prisma.visit.create({
            data: {
                hostId: createVisitDto.hostId,
                visitorId: visitor.id,
                visitorName: createVisitDto.visitorName,
                visitorIdNumber: createVisitDto.visitorIdNumber,
                licensePlate: createVisitDto.licensePlate?.toUpperCase(),
                companionCount: Number(createVisitDto.companionCount) || 0,
                images: createVisitDto.images,
                validFrom: new Date(createVisitDto.validFrom),
                validUntil: new Date(createVisitDto.validUntil),
                status: 'PENDING',
                accessCode,
                spaceId: createVisitDto.spaceId,
            },
            include: {
                host: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                visitor: true,
                space: true,
            },
        });

        this.gateway.emitVisitUpdate(newVisit);
        return newVisit;
    }

    findAll(startDate?: string, endDate?: string) {
        const where: any = {};
        if (startDate && endDate) {
            where.createdAt = {
                gte: new Date(startDate),
                lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
            };
        }
        return this.prisma.visit.findMany({
            where,
            include: {
                host: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                visitor: true,
                space: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findByHost(hostId: string, startDate?: string, endDate?: string) {
        const where: any = { hostId };
        if (startDate && endDate) {
            where.createdAt = {
                gte: new Date(startDate),
                lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
            };
        }
        return this.prisma.visit.findMany({
            where,
            include: {
                host: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                visitor: true,
                space: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findOne(id: string) {
        return this.prisma.visit.findUnique({
            where: { id },
            include: {
                host: true,
                visitor: true,
                space: true,
            },
        });
    }

    async update(id: string, updateVisitDto: UpdateVisitDto) {
        const updatedVisit = await this.prisma.visit.update({
            where: { id },
            data: {
                ...updateVisitDto,
                validFrom: updateVisitDto.validFrom ? new Date(updateVisitDto.validFrom) : undefined,
                validUntil: updateVisitDto.validUntil ? new Date(updateVisitDto.validUntil) : undefined,
            },
            include: {
                host: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                visitor: true,
                space: true,
            },
        });
        this.gateway.emitVisitUpdate(updatedVisit);
        return updatedVisit;
    }

    async checkIn(qrCode: string) {
        const visit = await this.prisma.visit.findUnique({
            where: { qrCode },
            include: { host: true, visitor: true },
        });

        if (!visit) {
            throw new Error('Invalid QR Code');
        }

        const now = new Date();
        if (now < visit.validFrom || now > visit.validUntil) {
            throw new Error('This pass has expired or is not yet valid');
        }

        if (visit.status === 'CHECKED_IN') {
            throw new Error('Visitor is already checked in');
        }

        if (
            visit.status === 'CHECKED_OUT' ||
            visit.status === 'EXPIRED' ||
            visit.status === 'DENIED'
        ) {
            throw new Error('This pass is no longer valid');
        }

        const updatedVisit = await this.prisma.$transaction(async (tx) => {
            const v = await tx.visit.update({
                where: { id: visit.id },
                data: {
                    status: 'CHECKED_IN',
                    entryTime: new Date(),
                },
                include: {
                    host: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                    visitor: true,
                    space: true,
                },
            });

            if (v.spaceId) {
                await tx.space.update({
                    where: { id: v.spaceId },
                    data: { status: 'OCCUPIED' },
                });
            }
            return v;
        });

        this.gateway.emitVisitUpdate(updatedVisit);
        return updatedVisit;
    }

    async checkInByCode(accessCode: string) {
        const visit = await this.prisma.visit.findUnique({
            where: { accessCode },
            include: { host: true, visitor: true },
        });

        if (!visit) {
            throw new Error('Invalid Access Code');
        }

        const now = new Date();
        if (now < visit.validFrom || now > visit.validUntil) {
            throw new Error('Access Code is not valid at this time');
        }

        if (visit.status === 'CHECKED_IN') {
            throw new Error('Visitor is already checked in');
        }

        if (visit.status === 'CHECKED_OUT') {
            throw new Error('This pass has already been used');
        }

        const updatedVisit = await this.prisma.$transaction(async (tx) => {
            const v = await tx.visit.update({
                where: { id: visit.id },
                data: {
                    status: 'CHECKED_IN',
                    entryTime: now,
                },
                include: {
                    host: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                    visitor: true,
                    space: true,
                },
            });

            if (v.spaceId) {
                await tx.space.update({
                    where: { id: v.spaceId },
                    data: { status: 'OCCUPIED' },
                });
            }
            return v;
        });

        this.gateway.emitVisitUpdate(updatedVisit);
        return updatedVisit;
    }

    async checkOut(id: string) {
        const visit = await this.prisma.visit.findUnique({
            where: { id },
        });

        if (!visit) throw new Error('Visit not found');

        if (visit.status !== 'CHECKED_IN') {
            throw new Error('Visitor is not currently checked in');
        }

        const updatedVisit = await this.prisma.$transaction(async (tx) => {
            const v = await tx.visit.update({
                where: { id: visit.id },
                data: {
                    status: 'CHECKED_OUT',
                    exitTime: new Date(),
                },
                include: {
                    host: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                    visitor: true,
                    space: true,
                },
            });

            if (v.spaceId) {
                await tx.space.update({
                    where: { id: v.spaceId },
                    data: { status: 'AVAILABLE' },
                });
            }
            return v;
        });

        this.gateway.emitVisitUpdate(updatedVisit);
        return updatedVisit;
    }

    async checkOutByCode(accessCode: string) {
        const visit = await this.prisma.visit.findUnique({
            where: { accessCode },
        });

        if (!visit) throw new Error('Invalid Access Code');

        if (visit.status !== 'CHECKED_IN') {
            throw new Error('Visitor is not checked in');
        }

        return this.checkOut(visit.id);
    }

    async manualCheckIn(hostId: string, data: any) {
        const now = new Date();
        const existingVisit = await this.prisma.visit.findFirst({
            where: {
                visitorIdNumber: data.visitorIdNumber,
                status: 'PENDING',
                validFrom: { lte: now },
                validUntil: { gte: now },
            },
            orderBy: { validUntil: 'asc' },
        });

        if (existingVisit) {
            const updatedVisit = await this.prisma.$transaction(async (tx) => {
                const v = await tx.visit.update({
                    where: { id: existingVisit.id },
                    data: {
                        status: 'CHECKED_IN',
                        entryTime: now,
                        licensePlate: data.licensePlate ? data.licensePlate.toUpperCase() : existingVisit.licensePlate,
                        spaceId: data.spaceId || existingVisit.spaceId,
                    },
                    include: {
                        host: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                        visitor: true,
                        space: true,
                    },
                });

                if (v.spaceId) {
                    await tx.space.update({
                        where: { id: v.spaceId },
                        data: { status: 'OCCUPIED' },
                    });
                }
                return v;
            });

            this.gateway.emitVisitUpdate(updatedVisit);
            return updatedVisit;
        }

        const visitor = await this.prisma.visitor.upsert({
            where: { idNumber: data.visitorIdNumber },
            update: { name: data.visitorName },
            create: {
                idNumber: data.visitorIdNumber,
                name: data.visitorName,
            },
        });

        const newManualVisit = await this.prisma.$transaction(async (tx) => {
            const v = await tx.visit.create({
                data: {
                    visitorId: visitor.id,
                    visitorName: data.visitorName,
                    visitorIdNumber: data.visitorIdNumber,
                    licensePlate: data.licensePlate?.toUpperCase(),
                    companionCount: Number(data.companionCount) || 0,
                    images: data.images,
                    hostId: data.hostId || hostId,
                    status: 'CHECKED_IN',
                    entryTime: now,
                    validFrom: now,
                    validUntil: new Date(now.getTime() + 86400000),
                    spaceId: data.spaceId,
                },
                include: {
                    host: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                    visitor: true,
                    space: true,
                },
            });

            if (v.spaceId) {
                await tx.space.update({
                    where: { id: v.spaceId },
                    data: { status: 'OCCUPIED' },
                });
            }

            return v;
        });

        this.gateway.emitVisitUpdate(newManualVisit);
        return newManualVisit;
    }

    async cancel(id: string) {
        const visit = await this.prisma.visit.findUnique({
            where: { id },
        });

        if (!visit) throw new Error('Visit not found');

        if (visit.status !== 'PENDING' && visit.status !== 'APPROVED') {
            throw new Error('Only pending or approved visits can be cancelled');
        }

        const updatedVisit = await this.prisma.$transaction(async (tx) => {
            const v = await tx.visit.update({
                where: { id },
                data: {
                    status: 'EXPIRED',
                    updatedAt: new Date(),
                },
                include: {
                    host: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                    visitor: true,
                    space: true,
                },
            });

            if (v.spaceId) {
                await tx.space.update({
                    where: { id: v.spaceId },
                    data: { status: 'AVAILABLE' },
                });
            }
            return v;
        });

        this.gateway.emitVisitUpdate(updatedVisit);
        return updatedVisit;
    }

    async remove(id: string) {
        const deletedVisit = await this.prisma.visit.delete({
            where: { id },
        });
        this.gateway.emitVisitUpdate({ ...deletedVisit, status: 'DELETED' });
        return deletedVisit;
    }
}
