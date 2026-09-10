import { prisma } from "../../database";

export const batchesRepository = {
  async findMany() {
    return prisma.batch.findMany({
      include: {
        cr: {
          select: { id: true, fullName: true, registrationNumber: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  },
  async create(name: string) {
    return prisma.batch.create({
      data: { name },
    });
  },
  async assignCR(batchId: string, crId: string | null) {
    return prisma.batch.update({
      where: { id: batchId },
      data: { crId },
    });
  },
  async findById(id: string) {
    return prisma.batch.findUnique({ where: { id } });
  }
};
