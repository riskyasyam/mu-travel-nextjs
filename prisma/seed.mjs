// File: prisma/seed.mjs

import prismaPackage from '@prisma/client';
import bcrypt from 'bcrypt';

const { PrismaClient } = prismaPackage;
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const plainPassword = 'password123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@mutravel.com' },
  });

  if (!existingUser) {
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@mutravel.com',
        name: 'Admin MU Travel',
        hashedPassword: hashedPassword,
      },
    });
    console.log(`Created user: ${adminUser.email}`);
  } else {
    console.log('Admin user already exists.');
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });