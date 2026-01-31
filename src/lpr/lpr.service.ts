import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LprService {
  constructor(private prisma: PrismaService) { }

  async verifyPlate(plate: string) {
    const visit = await this.prisma.visit.findFirst({
      where: {
        licensePlate: plate,
        status: { in: ['APPROVED', 'CHECKED_IN'] },
        validFrom: { lte: new Date() },
        validUntil: { gte: new Date() },
      },
      include: {
        host: {
          select: { name: true, email: true }
        }
      },
    });

    return {
      found: !!visit,
      visit: visit || null
    };
  }

  async processPlate(plate: string) {
    // 1. Find active visit for this plate
    const visit = await this.prisma.visit.findFirst({
      where: {
        licensePlate: plate,
        status: 'APPROVED',
        validFrom: { lte: new Date() },
        validUntil: { gte: new Date() },
      },
      include: { host: true },
    });

    if (!visit) {
      // Create an access log for unauthorized entry attempt
      await this.prisma.accessLog.create({
        data: {
          plate,
          checkpoint: 'MAIN_GATE_LPR',
          direction: 'IN',
          timestamp: new Date(),
        },
      });
      throw new NotFoundException(`No active visit found for plate ${plate}`);
    }

    // 2. Update visit status and log entry
    const updatedVisit = await this.prisma.visit.update({
      where: { id: visit.id },
      data: {
        status: 'CHECKED_IN',
        entryTime: new Date(),
      },
    });

    // 3. Create access log
    await this.prisma.accessLog.create({
      data: {
        visitId: visit.id,
        plate,
        checkpoint: 'MAIN_GATE_LPR',
        direction: 'IN',
        timestamp: new Date(),
      },
    });

    return {
      message: 'Access granted',
      visitor: visit.visitorName,
      host: visit.host.name,
      visitId: visit.id,
    };
  }
}
