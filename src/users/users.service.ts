import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(createUserDto: CreateUserDto) {
        const { unitNumber, assignedSpaceIds, ...userData } = createUserDto;
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    ...userData,
                    password: hashedPassword,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    isActive: true,
                    createdAt: true,
                    idNumber: true,
                    phone: true,
                    dateOfBirth: true,
                    profileImage: true,
                    pushNotificationsEnabled: true,
                    pushToken: true,
                    residentProfile: true,
                },
            });

            if (user.role === 'RESIDENT' && (unitNumber || assignedSpaceIds)) {
                const residentProfile = await tx.residentProfile.create({
                    data: {
                        userId: user.id,
                        unitNumber: unitNumber || 'N/A',
                    },
                });

                if (assignedSpaceIds && assignedSpaceIds.length > 0) {
                    const spacesToAssign = await tx.space.findMany({
                        where: { id: { in: assignedSpaceIds } },
                        select: { id: true, name: true, residentProfileId: true },
                    });

                    const unavailableSpaces = spacesToAssign.filter(
                        (space) => space.residentProfileId !== null,
                    );

                    if (unavailableSpaces.length > 0) {
                        throw new BadRequestException(
                            `The following spaces are already assigned: ${unavailableSpaces
                                .map((s) => s.name)
                                .join(', ')}`,
                        );
                    }

                    await tx.space.updateMany({
                        where: { id: { in: assignedSpaceIds } },
                        data: { residentProfileId: residentProfile.id },
                    });
                }
            }

            return user;
        });
    }

    findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isActive: true,
                createdAt: true,
                residentProfile: {
                    select: {
                        unitNumber: true,
                        id: true,
                        assignedSpaces: true,
                    },
                },
                idNumber: true,
                phone: true,
                dateOfBirth: true,
                profileImage: true,
                pushNotificationsEnabled: true,
                pushToken: true,
            },
        });
    }

    findResidents() {
        return this.prisma.user.findMany({
            where: {
                role: 'RESIDENT',
                isActive: true,
            },
            select: {
                id: true,
                name: true,
                email: true,
                residentProfile: {
                    select: {
                        id: true,
                        unitNumber: true,
                    },
                },
            },
        });
    }

    findOne(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isActive: true,
                createdAt: true,
                residentProfile: {
                    include: {
                        assignedSpaces: true,
                    },
                },
                securityProfile: true,
                idNumber: true,
                phone: true,
                dateOfBirth: true,
                profileImage: true,
                pushNotificationsEnabled: true,
                pushToken: true,
            },
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const { unitNumber, assignedSpaceIds, ...userData } = updateUserDto;

        return this.prisma.$transaction(async (tx) => {
            if (userData.profileImage) {
                const existingUser = await tx.user.findUnique({
                    where: { id },
                    select: { profileImage: true },
                });

                if (existingUser?.profileImage) {
                    const filename = existingUser.profileImage.split('/').pop();
                    if (filename) {
                        const oldFilePath = path.join('uploads', 'profile-images', filename);
                        try {
                            if (fs.existsSync(oldFilePath)) {
                                fs.unlinkSync(oldFilePath);
                            }
                        } catch (error) {
                            console.error('Failed to delete old profile image:', error);
                        }
                    }
                }
            }

            if (userData.password) {
                userData.password = await bcrypt.hash(userData.password, 10);
            }

            const user = await tx.user.update({
                where: { id },
                data: userData,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    isActive: true,
                    idNumber: true,
                    phone: true,
                    dateOfBirth: true,
                    profileImage: true,
                    pushNotificationsEnabled: true,
                    pushToken: true,
                    residentProfile: {
                        include: {
                            assignedSpaces: true,
                        },
                    },
                },
            });

            if (user.role === 'RESIDENT') {
                const residentProfile = await tx.residentProfile.upsert({
                    where: { userId: user.id },
                    create: {
                        userId: user.id,
                        unitNumber: unitNumber || 'N/A',
                    },
                    update: {
                        unitNumber: unitNumber !== undefined ? unitNumber : undefined,
                    },
                });

                if (assignedSpaceIds !== undefined) {
                    await tx.space.updateMany({
                        where: { residentProfileId: residentProfile.id },
                        data: { residentProfileId: null },
                    });

                    if (assignedSpaceIds.length > 0) {
                        const spacesToAssign = await tx.space.findMany({
                            where: { id: { in: assignedSpaceIds } },
                            select: { id: true, name: true, residentProfileId: true },
                        });

                        const unavailableSpaces = spacesToAssign.filter(
                            (space) =>
                                space.residentProfileId !== null &&
                                space.residentProfileId !== residentProfile.id,
                        );

                        if (unavailableSpaces.length > 0) {
                            throw new BadRequestException(
                                `The following spaces are already assigned to other residents: ${unavailableSpaces
                                    .map((s) => s.name)
                                    .join(', ')}`,
                            );
                        }

                        await tx.space.updateMany({
                            where: { id: { in: assignedSpaceIds } },
                            data: { residentProfileId: residentProfile.id },
                        });
                    }
                }
            }

            return user;
        });
    }

    async remove(id: string) {
        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: { id },
                select: { profileImage: true, residentProfile: true },
            });

            await tx.notification.deleteMany({ where: { userId: id } });
            await tx.incidentReport.deleteMany({ where: { reporterId: id } });
            await tx.emergencyAlert.deleteMany({ where: { senderId: id } });
            await tx.visit.deleteMany({ where: { hostId: id } });

            if (user?.residentProfile) {
                await tx.space.updateMany({
                    where: { residentProfileId: user.residentProfile.id },
                    data: { residentProfileId: null },
                });

                await tx.vehicle.deleteMany({
                    where: { residentProfileId: user.residentProfile.id },
                });

                await tx.residentProfile.delete({
                    where: { id: user.residentProfile.id },
                });
            }

            await tx.securityProfile.deleteMany({ where: { userId: id } });

            if (user?.profileImage) {
                const filename = user.profileImage.split('/').pop();
                if (filename) {
                    const filePath = path.join('uploads', 'profile-images', filename);
                    try {
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                        }
                    } catch (error) {
                        console.error('Failed to delete profile image:', error);
                    }
                }
            }

            return tx.user.delete({ where: { id } });
        });
    }

    async updatePushSettings(id: string, pushToken: string, enabled: boolean) {
        return this.prisma.user.update({
            where: { id },
            data: {
                pushToken: pushToken !== undefined ? pushToken : undefined,
                pushNotificationsEnabled: enabled !== undefined ? enabled : undefined,
            },
        });
    }
}
