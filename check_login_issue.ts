import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { registrationNumber: '2020338501' }
  });
  console.log("User:", user);
  if (user) {
    const isValid = await bcrypt.compare('SEC123456', user.passwordHash);
    console.log("Password valid:", isValid);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
