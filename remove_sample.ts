import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const result = await prisma.resource.deleteMany({
    where: { title: 'Sample EEE Syllabus' }
  });
  console.log(`Deleted ${result.count} sample resource(s)`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
