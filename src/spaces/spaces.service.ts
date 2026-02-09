import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { QuotasService } from '../tenants/quotas.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';

@Injectable()
export class SpacesService {
    constructor(
        private prisma: PrismaService,
        private quotasService: QuotasService,
    ) { }

    async create(createSpaceDto: CreateSpaceDto) {
        await this.quotasService.checkQuota('parking');
        return this.prisma.space.create({
            data: createSpaceDto,
        });
    }

    async findAll(user: any, filterUserId?: string) {
        if (filterUserId) {
            const residentProfile = await this.prisma.residentProfile.findUnique({
                where: { userId: filterUserId },
            });
            if (!residentProfile) return [];
            return this.prisma.space.findMany({
                where: {
                    residentProfileId: residentProfile.id,
                },
            });
        }

        if (user.role === 'RESIDENT') {
            if (!user.residentProfileId) return [];
            return this.prisma.space.findMany({
                where: {
                    residentProfileId: user.residentProfileId,
                },
            });
        }

        return this.prisma.space.findMany({
            include: {
                residentProfile: {
                    include: {
                        user: {
                            select: { name: true },
                        },
                    },
                },
            },
        });
    }

    findOne(id: string) {
        return this.prisma.space.findUnique({
            where: { id },
        });
    }

    update(id: string, updateSpaceDto: UpdateSpaceDto) {
        return this.prisma.space.update({
            where: { id },
            data: updateSpaceDto,
        });
    }

    remove(id: string) {
        return this.prisma.space.delete({
            where: { id },
        });
    }
}
