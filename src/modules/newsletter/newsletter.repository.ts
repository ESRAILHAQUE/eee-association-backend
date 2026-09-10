import { prisma } from "../../database";

export const newsletterRepository = {
  /** Fetch all newsletter entries (stored as all-target notices) */
  async findAll() {
    return prisma.notice.findMany({
      where: { targetType: "all" },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        title: true,
        content: true,
        isPinned: true,
        createdAt: true,
        createdBy: { select: { id: true, fullName: true } },
      },
    });
  },

  /** Create a newsletter entry (stored as an all-target notice) */
  async create(data: { subject: string; content: string; createdById: string }) {
    return prisma.notice.create({
      data: {
        title: data.subject,
        content: data.content,
        targetType: "all",
        isPinned: false,
        isUrgent: false,
        createdById: data.createdById,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        createdBy: { select: { id: true, fullName: true } },
      },
    });
  },
};
