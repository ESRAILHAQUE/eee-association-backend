import { prisma } from "../../database";

export const batchesRepository = {
  async findMany() {
    const batches = await prisma.batch.findMany({
      include: {
        crs: {
          select: { id: true, fullName: true, registrationNumber: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    return Promise.all(batches.map(async (batch) => {
      const studentCount = await prisma.userProfile.count({
        where: { batch: batch.name }
      });
      return { ...batch, studentCount };
    }));
  },
  async create(name: string) {
    return prisma.batch.create({
      data: { name },
    });
  },
  async addCR(batchId: string, crId: string) {
    return prisma.batch.update({
      where: { id: batchId },
      data: {
        crs: {
          connect: { id: crId }
        }
      }
    });
  },
  async removeCR(batchId: string, crId: string) {
    return prisma.batch.update({
      where: { id: batchId },
      data: {
        crs: {
          disconnect: { id: crId }
        }
      }
    });
  },
  async findById(id: string) {
    return prisma.batch.findUnique({
      where: { id },
      include: { crs: true }
    });
  },
  async delete(id: string) {
    return prisma.batch.delete({ where: { id } });
  }
};
