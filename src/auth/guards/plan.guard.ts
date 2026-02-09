import { Injectable, CanActivate, ExecutionContext, SetMetadata, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const PLANS = {
    STARTER: 'starter',
    PREMIUM: 'premium',
    ELITE: 'elite',
};

export const PLAN_LIMITS = {
    [PLANS.STARTER]: {
        units: 50,
        parking: 100,
        monitors: 2,
        security: 5,
    },
    [PLANS.PREMIUM]: {
        units: 200,
        parking: 400,
        monitors: 5,
        security: 15,
    },
    [PLANS.ELITE]: {
        units: Infinity,
        parking: Infinity,
        monitors: Infinity,
        security: Infinity,
    },
};

export const Plan = (plan: string) => SetMetadata('plan', plan);

@Injectable()
export class PlanGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPlan = this.reflector.getAllAndOverride<string>('plan', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredPlan) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        // The plan should be in the JWT payload (we added it in AuthService)
        const userPlan = user?.plan || 'starter';

        const planHeirarchy = {
            [PLANS.STARTER]: 0,
            [PLANS.PREMIUM]: 1,
            [PLANS.ELITE]: 2,
        };

        if (planHeirarchy[userPlan] < planHeirarchy[requiredPlan]) {
            throw new ForbiddenException(`This feature requires a ${requiredPlan} plan or higher.`);
        }

        return true;
    }
}
