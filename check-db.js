const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    console.log(`Admin ID: ${admin?.id}`);
    const alertsCount = await prisma.emergencyAlert.count();
    const reportsCount = await prisma.incidentReport.count();
    console.log(`EmergencyAlerts: ${alertsCount}`);
    console.log(`IncidentReports: ${reportsCount}`);
    await prisma.$disconnect();
}

check();
