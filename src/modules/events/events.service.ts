import { prisma } from "../../database";
import { AppError } from "../../common/middleware";
import { eventsRepository } from "./events.repository";
import type { CreateEventBody } from "./events.types";
import type { JwtPayload } from "../../common/middleware/authMiddleware";

export const eventsService = {
  async create(actor: JwtPayload, body: CreateEventBody) {
    const role = actor.role ?? "";
    const startAt = new Date(body.startAt);
    const endAt = new Date(body.endAt);

    if (isNaN(startAt.getTime()) || isNaN(endAt.getTime())) {
      throw new AppError(400, "Invalid date format");
    }
    if (endAt <= startAt) {
      throw new AppError(400, "endAt must be after startAt");
    }

    if (role === "cr") {
      // CR events are batch-locked and start as drafts for moderator/admin approval
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      if (!profile?.batch) throw new AppError(403, "CR profile has no batch assigned");

      return eventsRepository.create({
        title: body.title,
        description: body.description,
        eventType: body.eventType ?? "other",
        status: "draft",
        venue: body.venue,
        startAt,
        endAt,
        targetBatch: profile.batch,
        maxCapacity: body.maxCapacity ?? null,
        createdById: actor.userId,
      });
    }

    if (role === "moderator") {
      return eventsRepository.create({
        title: body.title,
        description: body.description,
        eventType: body.eventType ?? "other",
        status: "draft",
        venue: body.venue,
        startAt,
        endAt,
        targetBatch: body.targetBatch ?? null,
        maxCapacity: body.maxCapacity ?? null,
        createdById: actor.userId,
      });
    }

    if (role === "admin" || role === "super_admin") {
      return eventsRepository.create({
        title: body.title,
        description: body.description,
        eventType: body.eventType ?? "other",
        status: "published",
        venue: body.venue,
        startAt,
        endAt,
        targetBatch: body.targetBatch ?? null,
        maxCapacity: body.maxCapacity ?? null,
        createdById: actor.userId,
      });
    }

    throw new AppError(403, "Not authorized to create events");
  },

  async getAll(actor: JwtPayload, query: { status?: string; targetBatch?: string }) {
    const role = actor.role ?? "";

    if (role === "admin" || role === "super_admin") {
      return eventsRepository.findAllAdmin({
        status: query.status as "draft" | "published" | "cancelled" | "completed" | undefined,
        targetBatch: query.targetBatch,
      });
    }

    if (role === "cr") {
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      if (!profile?.batch) throw new AppError(403, "CR profile has no batch assigned");
      return eventsRepository.findForCR(actor.userId, profile.batch);
    }

    if (role === "moderator") {
      return eventsRepository.findAllAdmin({});
    }

    // Student: only published events visible to their batch
    const profile = await prisma.userProfile.findUnique({
      where: { userId: actor.userId },
      select: { batch: true },
    });
    return eventsRepository.findAll({
      includeAll: false,
      targetBatch: profile?.batch ?? undefined,
    });
  },

  async getById(id: string) {
    const event = await eventsRepository.findById(id);
    if (!event) throw new AppError(404, "Event not found");
    return event;
  },

  async updateStatus(actor: JwtPayload, eventId: string, status: string) {
    const role = actor.role ?? "";
    if (role !== "admin" && role !== "super_admin" && role !== "moderator") {
      throw new AppError(403, "Only admin/moderator can change event status");
    }
    const event = await eventsRepository.findById(eventId);
    if (!event) throw new AppError(404, "Event not found");

    const approvedById =
      status === "published" ? actor.userId : undefined;

    return eventsRepository.updateStatus(
      eventId,
      status as "draft" | "published" | "cancelled" | "completed",
      approvedById,
    );
  },

  async rsvp(actor: JwtPayload, eventId: string) {
    const event = await eventsRepository.findById(eventId);
    if (!event) throw new AppError(404, "Event not found");
    if (event.status !== "published") throw new AppError(400, "Event is not open for RSVP");

    if (event.maxCapacity && event._count.rsvps >= event.maxCapacity) {
      throw new AppError(409, "Event is at full capacity");
    }

    const existing = await eventsRepository.rsvpExists(eventId, actor.userId);
    if (existing) throw new AppError(409, "Already registered for this event");

    await eventsRepository.createRsvp(eventId, actor.userId);
    return { registered: true };
  },

  async cancelRsvp(actor: JwtPayload, eventId: string) {
    const existing = await eventsRepository.rsvpExists(eventId, actor.userId);
    if (!existing) throw new AppError(404, "RSVP not found");
    await eventsRepository.deleteRsvp(eventId, actor.userId);
    return { registered: false };
  },

  async listRsvps(actor: JwtPayload, eventId: string) {
    const role = actor.role ?? "";
    if (!["admin", "super_admin", "cr", "moderator"].includes(role)) {
      throw new AppError(403, "Not authorized to view RSVPs");
    }
    const event = await eventsRepository.findById(eventId);
    if (!event) throw new AppError(404, "Event not found");
    return eventsRepository.listRsvps(eventId);
  },

  async deleteEvent(actor: JwtPayload, eventId: string) {
    const role = actor.role ?? "";
    const event = await eventsRepository.findById(eventId);
    if (!event) throw new AppError(404, "Event not found");

    const isOwner = event.createdBy.id === actor.userId;
    const isAdmin = role === "admin" || role === "super_admin";

    if (!isOwner && !isAdmin) {
      throw new AppError(403, "Not authorized to delete this event");
    }
    await eventsRepository.delete(eventId);
  },
};
