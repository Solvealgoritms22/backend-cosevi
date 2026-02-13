import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AppGateway } from '../app.gateway';
import { PrismaService } from '../prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
    constructor(
        private prisma: PrismaService,
        private gateway: AppGateway,
        @Inject(REQUEST) private request: Request,
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
        const tenantId = this.request.headers['x-tenant-id'] as string;
        this.gateway.emitIncidentCreated(report, tenantId);
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
        const tenantId = this.request.headers['x-tenant-id'] as string;
        this.gateway.emitCommentAdded({ incidentReportId, comment }, tenantId);
        return comment;
    }

    async updateStatus(id: string, status: string) {
        const report = await this.prisma.incidentReport.update({
            where: { id },
            data: { status },
        });
        const tenantId = this.request.headers['x-tenant-id'] as string;
        this.gateway.emitIncidentStatusUpdated(report, tenantId);
        return report;
    }
}
