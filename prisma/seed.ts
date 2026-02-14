import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Engineer Portfolio defaults (if missing)...');

    // 1. Initialize Admin if not exists
    const adminCount = await prisma.admin.count();
    if (adminCount === 0) {
        await prisma.admin.create({
            data: {
                id: 1,
                username: "engineer",
                password: "94840",
            },
        });
        console.log('Created default admin.');
    }

    // 2. Initialize HomePage if not exists
    const homeCount = await prisma.homePage.count();
    if (homeCount === 0) {
        await prisma.homePage.create({
            data: {
                id: 1,
                heroTitle: "Professional Engineer",
                heroSub: "Precision, Innovation, and Excellence in engineering designs.",
                aboutShort: "I specialize in creating detailed engineering plans and innovative designs that stand the test of time.",
            },
        });
        console.log('Created default homepage data.');
    }

    // 3. Initialize AboutPage if not exists
    const aboutCount = await prisma.aboutPage.count();
    if (aboutCount === 0) {
        await prisma.aboutPage.create({
            data: {
                id: 1,
                bio: "I am a dedicated engineer with years of experience in structural and civil engineering, specializing in innovative design solutions that are built to last.",
                mission: "To provide high-quality engineering designs that combine aesthetic beauty with structural integrity.",
                experience: "Over 10 years of professional experience in the engineering industry, covering structural analysis, architectural design, and project management.",
            },
        });
        console.log('Created default about data.');
    }

    // 4. Initialize ContactInfo if not exists
    const contactCount = await prisma.contactInfo.count();
    if (contactCount === 0) {
        await prisma.contactInfo.create({
            data: {
                id: 1,
                email: "engineer@example.com",
                phone: "+123 456 7890",
                address: "123 Engineering Way",
                linkedin: "linkedin.com/in/engineer",
            },
        });
        console.log('Created default contact data.');
    }

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error('Seed Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
