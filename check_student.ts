import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.findUnique({
    where: { registrationNumber: '2020338501' },
    include: { profile: true }
  });
  console.log(user);
}
main().catch(console.error).finally(() => prisma.$disconnect());
