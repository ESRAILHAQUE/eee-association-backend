import { prisma } from "../../database";

const documentSelect = {
  id: true,
  title: true,
  description: true,
  fileUrl: true,
  fileType: true,
  category: true,
  accessLevel: true,
  createdAt: true,
  uploadedBy: { select: { id: true, fullName: true } },
};

export const documentsRepository = {
  async create(data: {
    title: string;
    description?: string | null;
    fileUrl: string;
    fileType: string;
    category: string;
    accessLevel: string;
    uploadedById: string;
  }) {
    return prisma.document.create({ data, select: documentSelect });
  },

  async findAll(filters?: { category?: string }) {
    return prisma.document.findMany({
      where: filters?.category ? { category: filters.category } : {},
      orderBy: { createdAt: "desc" },
      select: documentSelect,
    });
  },

  async findById(id: string) {
    return prisma.document.findUnique({ where: { id }, select: documentSelect });
  },

  async delete(id: string) {
    return prisma.document.delete({ where: { id } });
  },
};
