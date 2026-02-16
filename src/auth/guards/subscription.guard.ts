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

        // 1. CANCELLED: Block everything except maybe some basic info or billing (if we had specific routes for it here)
        if (status === 'CANCELLED') {
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
