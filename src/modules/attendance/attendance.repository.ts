import { prisma } from "../../database";

const qrSelect = {
  id: true,
  eventId: true,
  token: true,
  expiresAt: true,
  createdAt: true,
  createdBy: { select: { id: true, fullName: true } },
};

const attendanceSelect = {
  id: true,
  eventId: true,
  userId: true,
  scannedAt: true,
  event: { select: { id: true, title: true, startAt: true } },
  user: { select: { id: true, fullName: true, registrationNumber: true } },
};

export const attendanceRepository = {
  /** Upsert QR for an event (one QR per event, regenerate if called again) */
  async upsertQR(data: {
    eventId: string;
    token: string;
    expiresAt: Date;
    createdById: string;
  }) {
    return prisma.attendanceQR.upsert({
      where: { eventId: data.eventId },
      create: data,
      update: {
        token: data.token,
        expiresAt: data.expiresAt,
        createdById: data.createdById,
      },
      select: qrSelect,
    });
  },

  /** Find QR by eventId */
  async findQRByEventId(eventId: string) {
    return prisma.attendanceQR.findUnique({
      where: { eventId },
      select: qrSelect,
    });
  },

  /** Find QR by token */
  async findQRByToken(token: string) {
    return prisma.attendanceQR.findUnique({
      where: { token },
      select: { id: true, eventId: true, token: true, expiresAt: true },
    });
  },

  /** Check if attendance already recorded */
  async findAttendance(eventId: string, userId: string) {
    return prisma.attendance.findUnique({
      where: { eventId_userId: { eventId, userId } },
    });
  },

  /** Record attendance */
  async createAttendance(eventId: string, userId: string) {
    return prisma.attendance.create({
      data: { eventId, userId },
      select: { id: true, eventId: true, userId: true, scannedAt: true },
    });
  },

  /** List attendees for an event */
  async findByEvent(eventId: string) {
    return prisma.attendance.findMany({
      where: { eventId },
      orderBy: { scannedAt: "asc" },
      select: attendanceSelect,
    });
  },

  /** Get all attendance records for a user */
  async findByUser(userId: string) {
    return prisma.attendance.findMany({
      where: { userId },
      orderBy: { scannedAt: "desc" },
      select: attendanceSelect,
    });
  },
};
