import { prisma } from "../../database";
import { AppError } from "../../common/middleware";
import { certificatesRepository } from "./certificates.repository";
import type { IssueCertificatesBody } from "./certificates.types";
import type { JwtPayload } from "../../common/middleware/authMiddleware";

export const certificatesService = {
  /** Bulk-issue certificates for an event. CR is batch-scoped. */
  async issue(actor: JwtPayload, body: IssueCertificatesBody) {
    const role = actor.role ?? "";

    if (body.userIds.length === 0) {
      throw new AppError(400, "userIds must not be empty");
    }

    const event = await prisma.event.findUnique({ where: { id: body.eventId } });
    if (!event) throw new AppError(404, "Event not found");

    if (role === "cr") {
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      if (!profile?.batch) throw new AppError(403, "CR profile has no batch assigned");
      if (event.targetBatch && event.targetBatch !== profile.batch) {
        throw new AppError(403, "This event does not belong to your batch");
      }
    }

    const records = body.userIds.map((userId) => ({
      userId,
      eventId: body.eventId,
      issuedById: actor.userId,
    }));

    const result = await certificatesRepository.createMany(records);
    return { issued: result.count };
  },

  /** Member gets their own certificates */
  async getMy(actor: JwtPayload) {
    return certificatesRepository.findByUser(actor.userId);
  },

  /** CR/admin lists certificates for an event (CR batch-scoped) */
  async getByEvent(actor: JwtPayload, eventId: string) {
    const role = actor.role ?? "";

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new AppError(404, "Event not found");

    if (role === "cr") {
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      if (!profile?.batch) throw new AppError(403, "CR profile has no batch assigned");
      if (event.targetBatch && event.targetBatch !== profile.batch) {
        throw new AppError(403, "This event does not belong to your batch");
      }
    }

    return certificatesRepository.findByEvent(eventId);
  },
};
