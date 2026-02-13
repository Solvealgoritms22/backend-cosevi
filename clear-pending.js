const { PrismaClient } = require('./prisma/generated/master');
require('dotenv').config();

async function clearPending() {
    const prisma = new PrismaClient({
        datasources: { db: { url: process.env.MASTER_DATABASE_URL } },
    });

    try {
        console.log('Clearing PENDING registrations...');
        const result = await prisma.pendingRegistration.deleteMany({
            where: { status: 'PENDING' }
        });

        console.log(`Deleted ${result.count} pending registration(s).`);

    } catch (error) {
        console.error('Error clearing database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

clearPending();
