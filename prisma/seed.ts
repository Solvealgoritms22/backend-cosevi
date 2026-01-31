import { PrismaClient, Role, SpaceStatus, VisitStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('password123', 10);

    // Users
    const admin = await prisma.user.upsert({
        where: { email: 'admin@cosevi.com' },
        update: {},
        create: {
            email: 'admin@cosevi.com',
            name: 'Admin User',
            password,
            role: Role.ADMIN,
        },
    });

    const resident = await prisma.user.upsert({
        where: { email: 'resident@cosevi.com' },
        update: {},
        create: {
            email: 'resident@cosevi.com',
            name: 'John Doe',
            password,
            role: Role.RESIDENT,
            residentProfile: {
                create: {
                    unitNumber: 'Apt 4B, Tower 1',
                },
            },
        },
    });

    const security = await prisma.user.upsert({
        where: { email: 'security@cosevi.com' },
        update: {},
        create: {
            email: 'security@cosevi.com',
            name: 'Guard Smith',
            password,
            role: Role.SECURITY,
            securityProfile: {
                create: {
                    checkpointId: 'Main Gate',
                },
            },
        },
    });

    // Spaces
    const spacesData = [
        { name: 'A-101', type: 'PARKING', status: SpaceStatus.OCCUPIED, level: 1 },
        { name: 'A-102', type: 'PARKING', status: SpaceStatus.AVAILABLE, level: 1 },
        { name: 'A-103', type: 'PARKING', status: SpaceStatus.OCCUPIED, level: 1 },
        { name: 'A-104', type: 'PARKING', status: SpaceStatus.RESERVED, level: 1 },
        { name: 'B-201', type: 'PARKING', status: SpaceStatus.AVAILABLE, level: 2 },
        { name: 'B-202', type: 'PARKING', status: SpaceStatus.AVAILABLE, level: 2 },
    ];

    for (const space of spacesData) {
        await prisma.space.create({ data: space });
    }

    // Visits
    await prisma.visit.create({
        data: {
            hostId: resident.id,
            visitorName: 'Alice Johnson',
            visitorIdNumber: 'V1234567',
            licensePlate: 'PRX-9012',
            status: VisitStatus.CHECKED_IN,
            validFrom: new Date(),
            validUntil: new Date(Date.now() + 86400000),
        },
    });

    await prisma.visit.create({
        data: {
            hostId: resident.id,
            visitorName: 'Bob Wilson',
            visitorIdNumber: 'V7654321',
            status: VisitStatus.PENDING,
            validFrom: new Date(),
            validUntil: new Date(Date.now() + 86400000),
        },
    });

    console.log('Seed completed');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
