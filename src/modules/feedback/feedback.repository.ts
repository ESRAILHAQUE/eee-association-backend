import { prisma } from "../../database";
import type { FeedbackStatus } from "./feedback.types";

const feedbackSelect = {
  id: true,
  isAnonymous: true,
  title: true,
  content: true,
  batch: true,
  status: true,
  resolution: true,
  createdAt: true,
  updatedAt: true,
  // Only expose submitter info when not anonymous (handled in service layer)
  submittedBy: {
    select: { id: true, fullName: true, registrationNumber: true },
  },
};

export const feedbackRepository = {
  async create(data: {
    submittedById: string;
    isAnonymous: boolean;
    title: string;
    content: string;
    batch: string | null;
  }) {
    return prisma.feedback.create({ data, select: feedbackSelect });
  },

  /** Admin: all feedback, optionally filtered */
  async findAll(filters?: { status?: FeedbackStatus; batch?: string }) {
    return prisma.feedback.findMany({
      where: {
        ...(filters?.status ? { status: filters.status } : {}),
        ...(filters?.batch ? { batch: filters.batch } : {}),
      },
      orderBy: { createdAt: "desc" },
      select: feedbackSelect,
    });
  },

  /** CR: feedback scoped to their batch */
  async findByBatch(batch: string, filters?: { status?: FeedbackStatus }) {
    return prisma.feedback.findMany({
      where: {
        batch,
        ...(filters?.status ? { status: filters.status } : {}),
      },
      orderBy: { createdAt: "desc" },
      select: feedbackSelect,
    });
  },

  async findById(id: string) {
    return prisma.feedback.findUnique({ where: { id }, select: feedbackSelect });
  },

  async update(
    id: string,
    data: Partial<{ status: FeedbackStatus; resolution: string }>,
  ) {
    return prisma.feedback.update({ where: { id }, data, select: feedbackSelect });
  },
};
