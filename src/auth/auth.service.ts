import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { TenantsService } from '../tenants/tenants.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private usersService: UsersService,
        private jwtService: JwtService,
        private tenantsService: TenantsService,
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

    async register(registerData: any) {
        const { organizationName, plan, ...userData } = registerData;

        // 1. If it's an ADMIN registration from landing page, create a Tenant
        let tenantId: string | undefined;

        if (userData.role === 'ADMIN' && organizationName) {
            try {
                // Generate a simple subdomain from org name
                const subdomain = organizationName.toLowerCase().replace(/[^a-z0-9]/g, '');

                // Check if subdomain exists
                const existing = await this.tenantsService.getTenantById(subdomain); // This is wrong, should be by subdomain
                // For simplicity in this prototype, let's just create it with a random part if needed

                // IMPORTANT: In a real system, we'd provision a unique DB. 
                // For now, we'll use the same DB but eventually this would be unique.
                const newTenant = await this.tenantsService.createTenant({
                    name: organizationName,
                    subdomain: subdomain + '-' + Math.random().toString(36).substring(7),
                    dbUrl: process.env.DATABASE_URL || 'file:./dev.db', // Fallback to shared for now
                    plan: plan || 'starter'
                });

                tenantId = newTenant.id;
            } catch (error) {
                console.error('Failed to create tenant:', error);
                throw new InternalServerErrorException('Failed to initialize organization');
            }
        }

        // 2. Set the tenant-id header for this specific registration request 
        // if we just created one, so UsersService.create uses the right DB
        if (tenantId) {
            // We manually pass it to usersService or let usersService handle it.
            // Since PrismaService is REQUEST scoped, we can't easily change the header mid-request
            // unless we modify the request object.
            (this.prisma as any).request.headers['x-tenant-id'] = tenantId;
        }

        const user = await this.usersService.create(userData as CreateUserDto);

        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
            tenantId: tenantId,
            residentProfileId: (user as any).residentProfile?.id,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user,
            tenantId
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
