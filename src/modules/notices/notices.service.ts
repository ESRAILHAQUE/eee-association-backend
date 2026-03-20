import { prisma } from "../../database";
import { AppError } from "../../common/middleware";
import { noticesRepository } from "./notices.repository";
import type { CreateNoticeBody } from "./notices.types";
import type { JwtPayload } from "../../common/middleware/authMiddleware";

export const noticesService = {
  /** Create a notice. CRs are batch-locked to their own batch. */
  async create(actor: JwtPayload, body: CreateNoticeBody) {
    const role = actor.role ?? "";

    if (role === "cr") {
      // Fetch CR's own profile to get their batch
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      if (!profile?.batch) {
        throw new AppError(403, "CR profile has no batch assigned");
      }
      return noticesRepository.create({
        title: body.title,
        content: body.content,
        targetType: "batch_specific",
        batch: profile.batch,
        isPinned: body.isPinned ?? false,
        isUrgent: body.isUrgent ?? false,
        createdById: actor.userId,
      });
    }

    if (role === "admin" || role === "super_admin") {
      const targetType = body.targetType ?? "all";
      if (targetType === "batch_specific" && !body.batch) {
        throw new AppError(400, "batch is required when targetType is batch_specific");
      }
      return noticesRepository.create({
        title: body.title,
        content: body.content,
        targetType,
        batch: targetType === "batch_specific" ? body.batch : null,
        isPinned: body.isPinned ?? false,
        isUrgent: body.isUrgent ?? false,
        createdById: actor.userId,
      });
    }

    throw new AppError(403, "Not authorized to post notices");
  },

  /** Get notices based on viewer's role */
  async getAll(actor: JwtPayload, query: { batch?: string; targetType?: string }) {
    const role = actor.role ?? "";

    if (role === "cr") {
      // CRs only see their own batch notices + all notices
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      if (!profile?.batch) throw new AppError(403, "CR profile has no batch assigned");
      return noticesRepository.findForBatch(profile.batch);
    }

    if (role === "student") {
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      const batch = profile?.batch ?? "";
      return noticesRepository.findForBatch(batch);
    }

    // Admin / Super Admin see everything, optionally filtered
    return noticesRepository.findAll({
      batch: query.batch,
      targetType: query.targetType as "all" | "batch_specific" | undefined,
    });
  },

  async deleteNotice(actor: JwtPayload, noticeId: string) {
    const notice = await noticesRepository.findById(noticeId);
    if (!notice) throw new AppError(404, "Notice not found");

    const role = actor.role ?? "";

    // CR can only delete their own notices
    if (role === "cr" && notice.createdBy.id !== actor.userId) {
      throw new AppError(403, "You can only delete your own notices");
    }

    await noticesRepository.delete(noticeId);
  },

  async updateNotice(
    actor: JwtPayload,
    noticeId: string,
    data: Partial<{ title: string; content: string; isPinned: boolean; isUrgent: boolean }>,
  ) {
    const notice = await noticesRepository.findById(noticeId);
    if (!notice) throw new AppError(404, "Notice not found");

    const role = actor.role ?? "";
    if (role === "cr" && notice.createdBy.id !== actor.userId) {
      throw new AppError(403, "You can only edit your own notices");
    }

    return noticesRepository.update(noticeId, data);
  },
};
