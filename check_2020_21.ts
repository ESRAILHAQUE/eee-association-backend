import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany({
    where: { profile: { batch: "2020-21" } },
    include: { profile: true }
  });
  console.log(`Found ${users.length} users in 2020-21 batch.`);
  if (users.length > 0) {
    console.log(`Sample user: ${users[0].fullName}, Email: ${users[0].institutionalEmail}, passwordHash: ${users[0].passwordHash ? 'SET' : 'NULL'}`);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
