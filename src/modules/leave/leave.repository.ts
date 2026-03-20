import { prisma } from "../../database";
import type { LeaveStatus } from "./leave.types";

const leaveSelect = {
  id: true,
  title: true,
  reason: true,
  leaveDate: true,
  returnDate: true,
  status: true,
  reviewNote: true,
  createdAt: true,
  updatedAt: true,
  user: { select: { id: true, fullName: true, registrationNumber: true } },
  reviewedBy: { select: { id: true, fullName: true } },
};

export const leaveRepository = {
  async create(data: {
    userId: string;
    title: string;
    reason: string;
    leaveDate: Date;
    returnDate: Date;
  }) {
    return prisma.leaveRequest.create({ data, select: leaveSelect });
  },

  /** Get all leave requests for a specific user */
  async findByUser(userId: string) {
    return prisma.leaveRequest.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: leaveSelect,
    });
  },

  /** Admin: all requests with optional filters */
  async findAll(filters?: { status?: LeaveStatus }) {
    return prisma.leaveRequest.findMany({
      where: filters?.status ? { status: filters.status } : {},
      orderBy: { createdAt: "desc" },
      select: leaveSelect,
    });
  },

  /** CR: requests from users in a specific batch */
  async findByBatch(batch: string, filters?: { status?: LeaveStatus }) {
    return prisma.leaveRequest.findMany({
      where: {
        user: { profile: { batch } },
        ...(filters?.status ? { status: filters.status } : {}),
      },
      orderBy: { createdAt: "desc" },
      select: leaveSelect,
    });
  },

  async findById(id: string) {
    return prisma.leaveRequest.findUnique({ where: { id }, select: leaveSelect });
  },

  async update(
    id: string,
    data: { status: LeaveStatus; reviewedById: string; reviewNote?: string },
  ) {
    return prisma.leaveRequest.update({ where: { id }, data, select: leaveSelect });
  },
};
