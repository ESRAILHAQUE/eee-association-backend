import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.findFirst({ where: { currentRole: 'admin' } });
  if (admin) {
    const res = await prisma.resource.create({
      data: {
        title: 'Sample EEE Syllabus',
        subject: 'General',
        fileUrl: 'https://example.com/syllabus.pdf',
        fileType: 'pdf',
        description: 'Test resource to see if it shows up.',
        status: 'approved',
        uploadedById: admin.id
      }
    });
    console.log('Created dummy resource:', res);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
