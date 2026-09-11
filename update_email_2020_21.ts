import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { profile: { batch: "2020-21" } },
  });
  
  let count = 0;
  for (const user of users) {
    if (user.institutionalEmail.endsWith('@sec.edu.bd')) {
      const newEmail = user.institutionalEmail.replace('@sec.edu.bd', '@sec.ac.bd');
      await prisma.user.update({
        where: { id: user.id },
        data: { institutionalEmail: newEmail }
      });
      count++;
    }
  }
  
  console.log(`Successfully updated email for ${count} students in the 2020-21 batch to @sec.ac.bd.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
