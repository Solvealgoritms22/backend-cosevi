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

        const tenantId = (this.prisma as any).request.headers['x-tenant-id'];
        let tenantInfo = null;

        if (tenantId) {
            const tenant = await this.tenantsService.getTenantById(tenantId) as any;
            if (tenant) {
                tenantInfo = {
                    id: tenant.id,
                    name: tenant.name,
                    plan: tenant.plan,
                    branding: {
                        logo: tenant.logoUrl,
                        primaryColor: tenant.primaryColor,
                        secondaryColor: tenant.secondaryColor,
                    },
                    apiKey: tenant.apiKey,
                };
            }
        }

        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
            tenantId: tenantId,
            plan: tenantInfo?.plan || 'starter',
            residentProfileId: user.residentProfile?.id,
        };

        // Check if user has a qrSecret, if not generate one (lazy migration)
        if (!user.qrSecret) {
            const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            await this.prisma.user.update({
                where: { id: user.id },
                data: { qrSecret: secret }
            });
            (user as any).qrSecret = secret;
        }

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                ...user,
                qrSecret: (user as any).qrSecret // Ensure it's passed to client
            },
            tenant: tenantInfo,
        };
    }

    async register(registerData: any) {
        const { organizationName, plan, location, ...userData } = registerData;

        // 1. If it's an ADMIN registration from landing page, create a Tenant
        let tenantId: string | undefined;

        if (userData.role === 'ADMIN' && organizationName) {
            try {
                console.log(`[AuthService] Creating tenant for: ${organizationName}`);
                const subdomain = organizationName.toLowerCase().replace(/[^a-z0-9]/g, '');

                const newTenant = await this.tenantsService.createTenant({
                    name: organizationName,
                    subdomain: `${subdomain}-${Math.random().toString(36).substring(7)}`,
                    dbUrl: process.env.DATABASE_URL || 'file:./dev.db',
                    plan: plan || 'starter',
                    location: location
                });

                tenantId = newTenant.id;
                console.log(`[AuthService] Tenant created: ${tenantId}`);
            } catch (error) {
                console.error('[AuthService] Tenant creation failed:', error);
                throw new InternalServerErrorException('Error initializing organization: ' + error.message);
            }
        } else {
            console.log('[AuthService] Standard registration (no tenant created)', { role: userData.role, hasOrg: !!organizationName });
        }

        // 2. Set the tenant-id header for this specific registration request 
        if (tenantId && (this.prisma as any).request) {
            (this.prisma as any).request.headers['x-tenant-id'] = tenantId;
        }

        try {
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
        } catch (error) {
            console.error('[AuthService] User creation failed:', error);
            if (error.code === 'P2002' || error.message?.includes('Unique constraint')) {
                throw new BadRequestException('The email address is already registered.');
            }
            throw error;
        }
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
