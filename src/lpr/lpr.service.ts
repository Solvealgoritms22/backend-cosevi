import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LprService {
  constructor(private prisma: PrismaService) { }

  async verifyPlate(plate: string) {
    const cleanPlate = plate.replace(/[^A-Z0-9]/gi, '').toUpperCase();

    // We try to find visits that match the plate string directly, 
    // or match after removing non-alphanumeric characters.
    // Since we can't easily normalize the DB column in a standard Prisma query,
    // we fetch active visits and filter them in memory, or use a broad 'contains'

    const activeVisits = await this.prisma.visit.findMany({
      where: {
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

    const visit = activeVisits.find(v => {
      if (!v.licensePlate) return false;
      const dbPlate = v.licensePlate.replace(/[^A-Z0-9]/gi, '').toUpperCase();
      return dbPlate === cleanPlate || v.licensePlate.toUpperCase() === plate.toUpperCase();
    });

    return {
      found: !!visit,
      visit: visit || null,
      visits: visit ? [visit] : [] // Keep compatibility with frontend expectation
    };
  }

  async processPlate(plate: string) {
    const cleanPlate = plate.replace(/[^A-Z0-9]/gi, '').toUpperCase();

    // 1. Find active visit for this plate
    const activeVisits = await this.prisma.visit.findMany({
      where: {
        status: 'APPROVED',
        validFrom: { lte: new Date() },
        validUntil: { gte: new Date() },
      },
      include: { host: true },
    });

    const visit = activeVisits.find(v => {
      if (!v.licensePlate) return false;
      const dbPlate = v.licensePlate.replace(/[^A-Z0-9]/gi, '').toUpperCase();
      return dbPlate === cleanPlate || v.licensePlate.toUpperCase() === plate.toUpperCase();
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
