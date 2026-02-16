import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { TenantsService } from '../tenants/tenants.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private usersService: UsersService,
        private jwtService: JwtService,
        private tenantsService: TenantsService,
        private emailService: EmailService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        // Multi-tenant database selection logic
        const tenantId = (this.prisma as any).request?.headers?.['x-tenant-id'];

        if (!tenantId) {
            console.log(`[AuthService] No x-tenant-id header found. Attempting auto-discovery for ${email}`);

            // 1. Try Global User Map (covers all users)
            const globalUser = await this.tenantsService.getGlobalUser(email);
            if (globalUser) {
                console.log(`[AuthService] Auto-discovered tenant ${globalUser.tenantId} via GlobalUserMap for ${email}`);
                if ((this.prisma as any).request) {
                    (this.prisma as any).request.headers['x-tenant-id'] = globalUser.tenantId;
                }
            } else {
                // 2. Fallback to Admin Email lookup (legacy/migration)
                const tenant = await this.tenantsService.getTenantByAdminEmail(email);
                if (tenant) {
                    console.log(`[AuthService] Auto-discovered tenant ${tenant.id} via AdminEmail for ${email}`);
                    if ((this.prisma as any).request) {
                        (this.prisma as any).request.headers['x-tenant-id'] = tenant.id;
                    }
                } else {
                    console.warn(`[AuthService] Could not auto-discover tenant for ${email}`);
                }
            }
        }

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
                const subInfo = await this.tenantsService.getSubscriptionStatus(tenantId);
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
                    subscriptionStatus: subInfo.status,
                    subscriptionPeriodEnd: subInfo.currentPeriodEnd,
                };
            }
        }

        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
            tenantId: tenantId,
            plan: tenantInfo?.plan || 'starter',
            subscriptionStatus: tenantInfo?.subscriptionStatus || 'ACTIVE',
            subscriptionPeriodEnd: tenantInfo?.subscriptionPeriodEnd,
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
                plan: plan || 'starter',
                subscriptionStatus: 'ACTIVE',
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

        if (!user) return null;

        const tenantId = (this.prisma as any).request?.headers?.['x-tenant-id'];
        let subscriptionStatus = 'ACTIVE';
        if (tenantId) {
            const subInfo = await this.tenantsService.getSubscriptionStatus(tenantId);
            subscriptionStatus = subInfo.status;
        }

        const result = {
            ...user,
            subscriptionStatus,
        };

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

        return result;
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        const user = await this.prisma.user.findUnique({ where: { email: forgotPasswordDto.email } });
        if (!user) {
            // Return success even if user not found to prevent enumeration
            return { message: 'If an account exists, a reset link has been sent.' };
        }

        const payload = { sub: user.id, email: user.email, type: 'reset' };
        const token = this.jwtService.sign(payload, { expiresIn: '1h' });

        await this.emailService.sendPasswordResetEmail(user.email, user.name || 'Usuario', token);
        return { message: 'If an account exists, a reset link has been sent.' };
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        try {
            const payload = this.jwtService.verify(resetPasswordDto.token);
            if (payload.type !== 'reset') {
                throw new BadRequestException('Invalid token type');
            }

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, salt);

            await this.prisma.user.update({
                where: { id: payload.sub },
                data: { password: hashedPassword },
            });

            return { message: 'Password has been successfully updated.' };
        } catch (error) {
            throw new BadRequestException('Invalid or expired token');
        }
    }
}
