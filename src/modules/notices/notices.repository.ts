import { prisma } from "../../database";
import type { NoticeTarget } from "./notices.types";

const noticeSelect = {
  id: true,
  title: true,
  content: true,
  targetType: true,
  batch: true,
  isPinned: true,
  isUrgent: true,
  createdAt: true,
  createdBy: {
    select: { id: true, fullName: true, currentRole: true },
  },
};

export const noticesRepository = {
  async create(data: {
    title: string;
    content: string;
    targetType: NoticeTarget;
    batch?: string | null;
    isPinned: boolean;
    isUrgent: boolean;
    createdById: string;
  }) {
    return prisma.notice.create({
      data,
      select: noticeSelect,
    });
  },

  /** All notices visible to a specific batch (all + batch_specific for that batch) */
  async findForBatch(batch: string) {
    return prisma.notice.findMany({
      where: {
        OR: [
          { targetType: "all" },
          { targetType: "batch_specific", batch },
        ],
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      select: noticeSelect,
    });
  },

  /** All notices (admin / super-admin view) */
  async findAll(filters?: { batch?: string; targetType?: NoticeTarget }) {
    return prisma.notice.findMany({
      where: {
        ...(filters?.batch ? { batch: filters.batch } : {}),
        ...(filters?.targetType ? { targetType: filters.targetType } : {}),
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      select: noticeSelect,
    });
  },

  async findById(id: string) {
    return prisma.notice.findUnique({ where: { id }, select: noticeSelect });
  },

  async update(
    id: string,
    data: Partial<{
      title: string;
      content: string;
      isPinned: boolean;
      isUrgent: boolean;
    }>,
  ) {
    return prisma.notice.update({ where: { id }, data, select: noticeSelect });
  },

  async delete(id: string) {
    return prisma.notice.delete({ where: { id } });
  },
};
