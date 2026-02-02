import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class ReportsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createReportDto: CreateReportDto) {
        return this.prisma.incidentReport.create({
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
        return this.prisma.incidentComment.create({
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
    }

    async updateStatus(id: string, status: string) {
        return this.prisma.incidentReport.update({
            where: { id },
            data: { status },
        });
    }
}
