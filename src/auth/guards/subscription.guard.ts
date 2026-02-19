import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SubscriptionGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            return true; // Let AuthGuard handle this
        }

        const status = user.subscriptionStatus || 'ACTIVE';
        const method = request.method;
        const path = request.url;

        // 0. Always allow access to billing-related endpoints for reactivation
        if (path.includes('/billing') || path.includes('/auth/profile')) {
            return true;
        }

        // 1. CANCELLED: Check if period has ended
        if (status === 'CANCELLED') {
            const periodEnd = user.subscriptionPeriodEnd ? new Date(user.subscriptionPeriodEnd) : null;
            const now = new Date();

            // If periodEnd is valid and in the future, allow access (grace period)
            if (periodEnd && periodEnd > now) {
                return true;
            }

            throw new ForbiddenException(
                'Suscripción cancelada. Por favor, contacta a soporte o renueva tu plan.',
            );
        }

        // 2. PAST_DUE: Read-only mode (Only GET allowed)
        if (status === 'PAST_DUE') {
            if (method !== 'GET') {
                throw new ForbiddenException(
                    'Pago pendiente. Tu cuenta está en modo de solo lectura. Realiza el pago para habilitar todas las funciones.',
                );
            }
        }

        return true;
    }
}
