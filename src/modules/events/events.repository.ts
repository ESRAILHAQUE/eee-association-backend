import { prisma } from "../../database";
import type { EventStatus, EventType } from "./events.types";

const eventSelect = {
  id: true,
  title: true,
  description: true,
  eventType: true,
  status: true,
  venue: true,
  startAt: true,
  endAt: true,
  targetBatch: true,
  maxCapacity: true,
  createdAt: true,
  createdBy: { select: { id: true, fullName: true, currentRole: true } },
  approvedBy: { select: { id: true, fullName: true } },
  _count: { select: { rsvps: true } },
};

export const eventsRepository = {
  async create(data: {
    title: string;
    description: string;
    eventType: EventType;
    status: EventStatus;
    venue: string;
    startAt: Date;
    endAt: Date;
    targetBatch?: string | null;
    maxCapacity?: number | null;
    createdById: string;
  }) {
    return prisma.event.create({ data, select: eventSelect });
  },

  async findAll(filters: {
    status?: EventStatus;
    targetBatch?: string | null;
    includeAll?: boolean; // if false, only published
  }) {
    return prisma.event.findMany({
      where: {
        ...(filters.status ? { status: filters.status } : {}),
        ...(!filters.includeAll ? { status: "published" } : {}),
        ...(filters.targetBatch !== undefined
          ? {
              OR: [
                { targetBatch: null },
                { targetBatch: filters.targetBatch },
              ],
            }
          : {}),
      },
      orderBy: { startAt: "asc" },
      select: eventSelect,
    });
  },

  /** Admin/moderator: all events regardless of status */
  async findAllAdmin(filters: { status?: EventStatus; targetBatch?: string }) {
    return prisma.event.findMany({
      where: {
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.targetBatch ? { targetBatch: filters.targetBatch } : {}),
      },
      orderBy: [{ status: "asc" }, { startAt: "asc" }],
      select: eventSelect,
    });
  },

  /** CR: events they created + published events for their batch */
  async findForCR(crUserId: string, batch: string) {
    return prisma.event.findMany({
      where: {
        OR: [
          { createdById: crUserId },
          {
            status: "published",
            OR: [{ targetBatch: null }, { targetBatch: batch }],
          },
        ],
      },
      orderBy: { startAt: "asc" },
      select: eventSelect,
    });
  },

  async findById(id: string) {
    return prisma.event.findUnique({ where: { id }, select: eventSelect });
  },

  async updateStatus(id: string, status: EventStatus, approvedById?: string) {
    return prisma.event.update({
      where: { id },
      data: { status, ...(approvedById ? { approvedById } : {}) },
      select: eventSelect,
    });
  },

  async update(
    id: string,
    data: Partial<{
      title: string;
      description: string;
      venue: string;
      startAt: Date;
      endAt: Date;
      maxCapacity: number | null;
    }>,
  ) {
    return prisma.event.update({ where: { id }, data, select: eventSelect });
  },

  async delete(id: string) {
    return prisma.event.delete({ where: { id } });
  },

  // ── RSVPs ──────────────────────────────────────────────────────────────────

  async rsvpExists(eventId: string, userId: string) {
    return prisma.eventRsvp.findUnique({
      where: { eventId_userId: { eventId, userId } },
    });
  },

  async createRsvp(eventId: string, userId: string) {
    return prisma.eventRsvp.create({ data: { eventId, userId } });
  },

  async deleteRsvp(eventId: string, userId: string) {
    return prisma.eventRsvp.delete({
      where: { eventId_userId: { eventId, userId } },
    });
  },

  async listRsvps(eventId: string) {
    return prisma.eventRsvp.findMany({
      where: { eventId },
      include: {
        user: { select: { id: true, fullName: true, registrationNumber: true } },
      },
      orderBy: { createdAt: "asc" },
    });
  },
};
