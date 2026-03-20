import { prisma } from "../../database";
import { AppError } from "../../common/middleware";
import { attendanceRepository } from "./attendance.repository";
import type { JwtPayload } from "../../common/middleware/authMiddleware";
import { randomUUID } from "crypto";

const QR_TTL_MINUTES = 30;

export const attendanceService = {
  /** CR/admin generates (or regenerates) a QR token for an event */
  async generateQR(actor: JwtPayload, eventId: string) {
    const role = actor.role ?? "";

    // Verify event exists
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new AppError(404, "Event not found");

    if (role === "cr") {
      // CR can only generate QR for events scoped to their own batch
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      if (!profile?.batch) throw new AppError(403, "CR profile has no batch assigned");
      if (event.targetBatch && event.targetBatch !== profile.batch) {
        throw new AppError(403, "This event does not belong to your batch");
      }
    }

    const token = randomUUID();
    const expiresAt = new Date(Date.now() + QR_TTL_MINUTES * 60 * 1000);

    return attendanceRepository.upsertQR({
      eventId,
      token,
      expiresAt,
      createdById: actor.userId,
    });
  },

  /** CR/admin retrieves existing QR for an event */
  async getQR(actor: JwtPayload, eventId: string) {
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

    const qr = await attendanceRepository.findQRByEventId(eventId);
    if (!qr) throw new AppError(404, "No QR generated for this event yet");
    return qr;
  },

  /** Member scans QR token to mark attendance */
  async scan(actor: JwtPayload, token: string) {
    const qr = await attendanceRepository.findQRByToken(token);
    if (!qr) throw new AppError(404, "Invalid QR token");

    if (new Date() > new Date(qr.expiresAt)) {
      throw new AppError(410, "QR token has expired");
    }

    const existing = await attendanceRepository.findAttendance(qr.eventId, actor.userId);
    if (existing) throw new AppError(409, "Attendance already recorded");

    return attendanceRepository.createAttendance(qr.eventId, actor.userId);
  },

  /** CR/admin lists all attendees for an event */
  async listByEvent(actor: JwtPayload, eventId: string) {
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

    return attendanceRepository.findByEvent(eventId);
  },

  /** Any user sees their own attendance history */
  async getMy(actor: JwtPayload) {
    return attendanceRepository.findByUser(actor.userId);
  },
};
