import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const resources = await prisma.resource.findMany();
  console.log(`Found ${resources.length} resources in total.`);
  for (const r of resources) {
    console.log(`- ${r.title}, Status: ${r.status}`);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
