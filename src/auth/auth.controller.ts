import { Controller, Post, Body, UnauthorizedException, BadRequestException, UseGuards, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }

    @Post('login')
    async login(@Body() body: any) {
        return this.authService.login(body);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto);
    }

    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return this.authService.getProfile(req.user.userId);
    }

    @Post('verify-resident-qr')
    async verifyResidentQr(@Body() body: { userId: string; token: string; timestamp: number }) {
        const { userId, token, timestamp } = body;

        // 1. Basic timestamp check (prevent replay attacks > 5 minutes old)
        const now = Date.now();
        if (Math.abs(now - timestamp) > 5 * 60 * 1000) {
            throw new BadRequestException('QR code expired');
        }

        // 2. Fetch user to verify existence and get secret (if we had per-user secrets)
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        // 3. Verify TOTP-style signature
        // Shared secret is now in user profile (synced to mobile app on login)
        const secret = user.qrSecret;

        if (!secret) {
            throw new UnauthorizedException('User has no QR secret setup. Please re-login.');
        }

        // Expected token = HMAC_SHA256(userId + timestamp, secret)
        const data = `${userId}:${timestamp}`;
        const expectedToken = crypto
            .createHmac('sha256', secret)
            .update(data)
            .digest('hex');

        if (token !== expectedToken) {
            throw new UnauthorizedException('Invalid QR code signature');
        }


        return {
            valid: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                unit: user.residentProfile?.unitNumber || 'N/A',
                image: user.profileImage
            }
        };
    }
}
