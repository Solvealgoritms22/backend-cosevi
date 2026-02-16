import { Injectable, Logger } from '@nestjs/common';
import { PusherService } from './pusher.service';

@Injectable()
export class AppGateway {
    private readonly logger = new Logger(AppGateway.name);

    constructor(private pusherService: PusherService) { }

    private getTenantChannel(tenantId: string, resource: string): string {
        return `private-tenant-${tenantId}-${resource}`;
    }

    emitVisitUpdate(data: any, tenantId?: string) {
        const tid = tenantId || data.tenantId || 'global';
        const channel = this.getTenantChannel(tid, 'visits');
        this.pusherService.trigger(channel, 'visitUpdate', data);
    }

    emitStatusUpdate(data: any, tenantId?: string) {
        const tid = tenantId || data.tenantId || 'global';
        const channel = this.getTenantChannel(tid, 'status');
        this.pusherService.trigger(channel, 'statusUpdate', data);
    }

    emitIncidentCreated(data: any, tenantId?: string) {
        const tid = tenantId || 'global';
        const channel = this.getTenantChannel(tid, 'visits');
        this.pusherService.trigger(channel, 'incidentCreated', data);
    }

    emitCommentAdded(data: any, tenantId?: string) {
        const tid = tenantId || 'global';
        const channel = this.getTenantChannel(tid, 'visits');
        this.pusherService.trigger(channel, 'commentAdded', data);
    }

    emitIncidentStatusUpdated(data: any, tenantId?: string) {
        const tid = tenantId || 'global';
        const channel = this.getTenantChannel(tid, 'visits');
        this.pusherService.trigger(channel, 'incidentStatusUpdated', data);
    }

    emitEmergencyAlert(data: any, tenantId?: string) {
        const tid = tenantId || 'global';
        const channel = this.getTenantChannel(tid, 'emergencies');
        this.pusherService.trigger(channel, 'emergencyAlert', data);
    }
}

