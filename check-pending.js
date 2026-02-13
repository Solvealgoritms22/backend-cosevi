const { PrismaClient } = require('./prisma/generated/master');
require('dotenv').config();

async function checkPending() {
    const prisma = new PrismaClient({
        datasources: { db: { url: process.env.MASTER_DATABASE_URL } },
    });

    try {
        console.log('Listing all PENDING registrations...');
        const pending = await prisma.pendingRegistration.findMany({
            where: { status: 'PENDING' },
            select: { email: true, createdAt: true, organizationName: true }
        });

        pending.forEach(p => {
            console.log(`[${p.createdAt.toISOString()}] ${p.email} - ${p.organizationName}`);
        });

    } catch (error) {
        console.error('Error checking database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkPending();
