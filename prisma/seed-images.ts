
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding profile images...');

    const securityEmail = 'security1@cosevi.com';
    const residentEmail = 'joahanna02@gmail.com';  // Fixed typo from screenshot 'joahanna02' if applicable, or generic. Screenshot says 'joahanna02@gmail.com'

    const sampleImage = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
    const sampleImageFem = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

    try {
        const securityUser = await prisma.user.update({
            where: { email: securityEmail },
            data: { profileImage: sampleImage },
        });
        console.log(`Updated security user: ${securityUser.email}`);
    } catch (e) {
        console.log(`Could not update ${securityEmail} (maybe not found)`);
    }

    try {
        const residentUser = await prisma.user.update({
            where: { email: residentEmail },
            data: { profileImage: sampleImageFem },
        });
        console.log(`Updated resident user: ${residentUser.email}`);
    } catch (e) {
        console.log(`Could not update ${residentEmail} (maybe not found)`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
