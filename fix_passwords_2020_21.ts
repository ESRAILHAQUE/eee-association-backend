import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const defaultPassword = await bcrypt.hash("SEC123456", 10);
  const result = await prisma.user.updateMany({
    where: { profile: { batch: "2020-21" } },
    data: { passwordHash: defaultPassword }
  });
  console.log(`Reset passwords for ${result.count} students in 2020-21`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
