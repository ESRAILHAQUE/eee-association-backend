import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { profile: { batch: "2020-21" } },
  });
  
  const defaultPassword = await bcrypt.hash("SEC123456", 10);
  
  let count = 0;
  for (const user of users) {
    // Optionally update email to match standard format if you want
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: defaultPassword }
    });
    count++;
  }
  
  console.log(`Successfully reset password for ${count} students in the 2020-21 batch.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
