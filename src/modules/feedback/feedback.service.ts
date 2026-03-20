import { prisma } from "../../database";
import { AppError } from "../../common/middleware";
import { feedbackRepository } from "./feedback.repository";
import type { CreateFeedbackBody, UpdateFeedbackBody, FeedbackStatus } from "./feedback.types";
import type { JwtPayload } from "../../common/middleware/authMiddleware";

/** Strip submittedBy from anonymous feedback before returning */
function sanitize<T extends { isAnonymous: boolean; submittedBy: unknown }>(
  feedback: T,
): Omit<T, "submittedBy"> & { submittedBy: unknown } {
  if (feedback.isAnonymous) {
    return { ...feedback, submittedBy: null };
  }
  return feedback;
}

export const feedbackService = {
  /** Member submits feedback; batch auto-populated from profile */
  async create(actor: JwtPayload, body: CreateFeedbackBody) {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: actor.userId },
      select: { batch: true },
    });

    const result = await feedbackRepository.create({
      submittedById: actor.userId,
      isAnonymous: body.isAnonymous ?? false,
      title: body.title,
      content: body.content,
      batch: profile?.batch ?? null,
    });

    return sanitize(result);
  },

  /** Admin sees all feedback; CR sees only their batch's feedback */
  async getAll(actor: JwtPayload, query: { status?: string; batch?: string }) {
    const role = actor.role ?? "";
    const status = query.status as FeedbackStatus | undefined;

    if (role === "cr") {
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      if (!profile?.batch) throw new AppError(403, "CR profile has no batch assigned");
      const items = await feedbackRepository.findByBatch(profile.batch, { status });
      return items.map(sanitize);
    }

    if (role === "admin" || role === "super_admin") {
      const items = await feedbackRepository.findAll({ status, batch: query.batch });
      return items.map(sanitize);
    }

    throw new AppError(403, "Not authorized to view feedback");
  },

  /** CR/admin updates status/resolution */
  async update(actor: JwtPayload, id: string, body: UpdateFeedbackBody) {
    const role = actor.role ?? "";
    const existing = await feedbackRepository.findById(id);
    if (!existing) throw new AppError(404, "Feedback not found");

    if (role === "cr") {
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      if (!profile?.batch) throw new AppError(403, "CR profile has no batch assigned");
      if (existing.batch !== profile.batch) {
        throw new AppError(403, "This feedback is not from your batch");
      }
    }

    const result = await feedbackRepository.update(id, {
      status: body.status,
      resolution: body.resolution,
    });

    return sanitize(result);
  },
};
