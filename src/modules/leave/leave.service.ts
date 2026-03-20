import { prisma } from "../../database";
import { AppError } from "../../common/middleware";
import { leaveRepository } from "./leave.repository";
import type { CreateLeaveBody, UpdateLeaveBody, LeaveStatus } from "./leave.types";
import type { JwtPayload } from "../../common/middleware/authMiddleware";

export const leaveService = {
  /** Member submits a leave request */
  async create(actor: JwtPayload, body: CreateLeaveBody) {
    const leaveDate = new Date(body.leaveDate);
    const returnDate = new Date(body.returnDate);

    if (isNaN(leaveDate.getTime()) || isNaN(returnDate.getTime())) {
      throw new AppError(400, "Invalid date format");
    }
    if (returnDate < leaveDate) {
      throw new AppError(400, "returnDate must be on or after leaveDate");
    }

    return leaveRepository.create({
      userId: actor.userId,
      title: body.title,
      reason: body.reason,
      leaveDate,
      returnDate,
    });
  },

  /** Member sees only their own requests */
  async getMy(actor: JwtPayload) {
    return leaveRepository.findByUser(actor.userId);
  },

  /** CR sees requests from their batch; admin sees all */
  async getAll(actor: JwtPayload, query: { status?: string }) {
    const role = actor.role ?? "";
    const status = query.status as LeaveStatus | undefined;

    if (role === "cr") {
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      if (!profile?.batch) throw new AppError(403, "CR profile has no batch assigned");
      return leaveRepository.findByBatch(profile.batch, { status });
    }

    if (role === "admin" || role === "super_admin") {
      return leaveRepository.findAll({ status });
    }

    throw new AppError(403, "Not authorized to view leave requests");
  },

  /** CR/admin approves or rejects a request */
  async update(actor: JwtPayload, id: string, body: UpdateLeaveBody) {
    const role = actor.role ?? "";

    const request = await leaveRepository.findById(id);
    if (!request) throw new AppError(404, "Leave request not found");

    if (role === "cr") {
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      if (!profile?.batch) throw new AppError(403, "CR profile has no batch assigned");

      // Verify the request belongs to a user in the CR's batch
      const requesterProfile = await prisma.userProfile.findUnique({
        where: { userId: request.user.id },
        select: { batch: true },
      });
      if (requesterProfile?.batch !== profile.batch) {
        throw new AppError(403, "This leave request is not from your batch");
      }
    }

    return leaveRepository.update(id, {
      status: body.status,
      reviewedById: actor.userId,
      reviewNote: body.reviewNote,
    });
  },
};
