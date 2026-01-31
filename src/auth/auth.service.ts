import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                residentProfile: {
                    include: {
                        assignedSpaces: true,
                    },
                },
                securityProfile: true,
            },
        });

        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
            residentProfileId: user.residentProfile?.id,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
            residentProfileId: user.residentProfile?.id,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }

    async getProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                profileImage: true,
                residentProfile: {
                    include: {
                        assignedSpaces: true,
                    },
                },
            },
        });

        if (user?.residentProfile?.assignedSpaces) {
            const spaceIds = user.residentProfile.assignedSpaces.map((s) => s.id);
            const activeVisits = await this.prisma.visit.findMany({
                where: {
                    spaceId: { in: spaceIds },
                    status: { in: ['PENDING', 'APPROVED', 'CHECKED_IN'] },
                },
                select: { spaceId: true },
            });

            const busySpaceIds = new Set(activeVisits.map((v) => v.spaceId).filter(Boolean));
            (user.residentProfile.assignedSpaces as any) = user.residentProfile.assignedSpaces.map(
                (space) => ({
                    ...space,
                    isOccupied: space.status !== 'AVAILABLE' || busySpaceIds.has(space.id),
                }),
            );
        }

        return user;
    }
}
