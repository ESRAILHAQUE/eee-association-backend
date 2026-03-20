import { prisma } from "../../database";
import type { ResourceStatus } from "./resources.types";

const resourceSelect = {
  id: true,
  title: true,
  description: true,
  subject: true,
  semester: true,
  fileUrl: true,
  fileType: true,
  status: true,
  downloads: true,
  batch: true,
  createdAt: true,
  uploadedBy: { select: { id: true, fullName: true } },
};

export const resourcesRepository = {
  async create(data: {
    title: string;
    description?: string | null;
    subject: string;
    semester?: number | null;
    fileUrl: string;
    fileType: string;
    uploadedById: string;
    batch: string | null;
  }) {
    return prisma.resource.create({ data, select: resourceSelect });
  },

  /** List approved resources with optional filters */
  async findApproved(filters?: { subject?: string; semester?: number }) {
    return prisma.resource.findMany({
      where: {
        status: "approved",
        ...(filters?.subject ? { subject: { contains: filters.subject, mode: "insensitive" } } : {}),
        ...(filters?.semester !== undefined ? { semester: filters.semester } : {}),
      },
      orderBy: { createdAt: "desc" },
      select: resourceSelect,
    });
  },

  /** Pending resources for moderation */
  async findPending() {
    return prisma.resource.findMany({
      where: { status: "pending" },
      orderBy: { createdAt: "asc" },
      select: resourceSelect,
    });
  },

  async findById(id: string) {
    return prisma.resource.findUnique({ where: { id }, select: resourceSelect });
  },

  async updateStatus(id: string, status: ResourceStatus) {
    return prisma.resource.update({ where: { id }, data: { status }, select: resourceSelect });
  },
};
