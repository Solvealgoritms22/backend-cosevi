import { Injectable } from '@nestjs/common';
import { AppGateway } from '../app.gateway';
import { PrismaService } from '../prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
    constructor(
        private prisma: PrismaService,
        private gateway: AppGateway
    ) { }

    async create(userId: string, createReportDto: CreateReportDto) {
        const report = await this.prisma.incidentReport.create({
            data: {
                ...createReportDto,
                reporterId: userId,
                status: 'OPEN',
            },
            include: {
                reporter: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        this.gateway.server.emit('incidentCreated', report);
        return report;
    }

    async findAll() {
        return this.prisma.incidentReport.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                reporter: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                comments: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        author: {
                            select: {
                                name: true,
                                role: true,
                                profileImage: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findByUser(userId: string) {
        return this.prisma.incidentReport.findMany({
            where: { reporterId: userId },
            orderBy: { createdAt: 'desc' },
            include: {
                reporter: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                comments: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        author: {
                            select: {
                                name: true,
                                role: true,
                                profileImage: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async addComment(incidentReportId: string, authorId: string, createCommentDto: CreateCommentDto) {
        const comment = await this.prisma.incidentComment.create({
            data: {
                text: createCommentDto.text,
                incidentReportId,
                authorId,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        role: true,
                        profileImage: true,
                    },
                },
            },
        });
        this.gateway.server.emit('commentAdded', { incidentReportId, comment });
        return comment;
    }

    async updateStatus(id: string, status: string) {
        const report = await this.prisma.incidentReport.update({
            where: { id },
            data: { status },
        });
        this.gateway.server.emit('incidentStatusUpdated', report);
        return report;
    }
}
