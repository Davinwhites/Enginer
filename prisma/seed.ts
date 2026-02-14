import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting total database reset to Engineer Portfolio...');

    // 1. Wipe everything to be sure
    await prisma.admin.deleteMany({});
    await prisma.homePage.deleteMany({});
    await prisma.aboutPage.deleteMany({});
    await prisma.contactInfo.deleteMany({});

    // 2. Initialize with Engineer Defaults
    await prisma.admin.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            username: "engineer",
            password: "94840",
        },
    });

    await prisma.homePage.upsert({
        where: { id: 1 },
        update: {
            heroTitle: "Professional Engineer",
            heroSub: "Precision, Innovation, and Excellence in engineering designs.",
            aboutShort: "I specialize in creating detailed engineering plans and innovative designs that stand the test of time.",
        },
        create: {
            id: 1,
            heroTitle: "Professional Engineer",
            heroSub: "Precision, Innovation, and Excellence in engineering designs.",
            aboutShort: "I specialize in creating detailed engineering plans and innovative designs that stand the test of time.",
        },
    });

    await prisma.aboutPage.upsert({
        where: { id: 1 },
        update: {
            bio: "I am a dedicated engineer with years of experience in structural and civil engineering, specializing in innovative design solutions that are built to last.",
            mission: "To provide high-quality engineering designs that combine aesthetic beauty with structural integrity.",
            experience: "Over 10 years of professional experience in the engineering industry, covering structural analysis, architectural design, and project management.",
        },
        create: {
            id: 1,
            bio: "I am a dedicated engineer with years of experience in structural and civil engineering, specializing in innovative design solutions that are built to last.",
            mission: "To provide high-quality engineering designs that combine aesthetic beauty with structural integrity.",
            experience: "Over 10 years of professional experience in the engineering industry, covering structural analysis, architectural design, and project management.",
        },
    });

    await prisma.contactInfo.upsert({
        where: { id: 1 },
        update: {
            email: "engineer@example.com",
            phone: "+123 456 7890",
            address: "123 Engineering Way",
            linkedin: "linkedin.com/in/engineer",
        },
        create: {
            id: 1,
            email: "engineer@example.com",
            phone: "+123 456 7890",
            address: "123 Engineering Way",
            linkedin: "linkedin.com/in/engineer",
        },
    });

    console.log('Database reset complete. All Shalom data has been wiped.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
