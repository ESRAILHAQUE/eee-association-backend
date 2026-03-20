import { prisma } from "../../database";
import { Decimal } from "@prisma/client/runtime/library";

const feeSelect = {
  id: true,
  semesterNumber: true,
  feeAmount: true,
  paidAmount: true,
  dueAmount: true,
  paymentStatus: true,
  paymentMethod: true,
  transactionReference: true,
  paymentDate: true,
  user: {
    select: {
      id: true,
      fullName: true,
      registrationNumber: true,
      profile: { select: { batch: true, rollNumber: true } },
    },
  },
};

export const feesRepository = {
  /** Create a fee record for a user/semester (idempotent — upsert) */
  async upsert(data: {
    userId: string;
    semesterNumber: number;
    feeAmount: Decimal;
  }) {
    const due = data.feeAmount;
    return prisma.associationFee.upsert({
      where: { userId_semesterNumber: { userId: data.userId, semesterNumber: data.semesterNumber } },
      create: {
        userId: data.userId,
        semesterNumber: data.semesterNumber,
        feeAmount: data.feeAmount,
        paidAmount: 0,
        dueAmount: due,
        paymentStatus: "unpaid",
      },
      update: {
        feeAmount: data.feeAmount,
        dueAmount: { decrement: new Decimal(0) }, // keep existing paid unchanged
      },
      select: feeSelect,
    });
  },

  /** Record a payment against an existing fee record */
  async recordPayment(
    id: string,
    data: {
      paidAmount: Decimal;
      paymentMethod?: string;
      transactionReference?: string;
    },
  ) {
    const existing = await prisma.associationFee.findUnique({ where: { id } });
    if (!existing) throw new Error("Fee record not found");
    const newPaid = new Decimal(existing.paidAmount).add(data.paidAmount);
    const newDue = new Decimal(existing.feeAmount).minus(newPaid);
    const status =
      newDue.lte(0) ? "paid" : newPaid.gt(0) ? "partial" : "unpaid";
    return prisma.associationFee.update({
      where: { id },
      data: {
        paidAmount: newPaid,
        dueAmount: newDue.lt(0) ? new Decimal(0) : newDue,
        paymentStatus: status,
        paymentMethod: data.paymentMethod,
        transactionReference: data.transactionReference,
        paymentDate: status === "paid" ? new Date() : undefined,
      },
      select: feeSelect,
    });
  },

  async findByUser(userId: string) {
    return prisma.associationFee.findMany({
      where: { userId },
      orderBy: { semesterNumber: "asc" },
      select: feeSelect,
    });
  },

  async findAll(filters?: { batch?: string; status?: string }) {
    return prisma.associationFee.findMany({
      where: {
        ...(filters?.batch
          ? { user: { profile: { batch: filters.batch } } }
          : {}),
        ...(filters?.status ? { paymentStatus: filters.status as never } : {}),
      },
      orderBy: [{ user: { registrationNumber: "asc" } }, { semesterNumber: "asc" }],
      select: feeSelect,
    });
  },

  /** CR: scoped to their batch */
  async findByBatch(batch: string, filters?: { status?: string }) {
    return prisma.associationFee.findMany({
      where: {
        user: { profile: { batch } },
        ...(filters?.status ? { paymentStatus: filters.status as never } : {}),
      },
      orderBy: [{ user: { registrationNumber: "asc" } }, { semesterNumber: "asc" }],
      select: feeSelect,
    });
  },

  async findById(id: string) {
    return prisma.associationFee.findUnique({ where: { id }, select: feeSelect });
  },

  /** Aggregate stats for a batch or all */
  async getStats(batch?: string) {
    const where = batch ? { user: { profile: { batch } } } : {};
    const [totalCount, paid, pending, overdue] = await Promise.all([
      prisma.associationFee.count({ where }),
      prisma.associationFee.count({ where: { ...where, paymentStatus: "paid" } }),
      prisma.associationFee.count({ where: { ...where, paymentStatus: "unpaid" } }),
      prisma.associationFee.count({ where: { ...where, paymentStatus: "partial" } }),
    ]);
    const agg = await prisma.associationFee.aggregate({
      where,
      _sum: { feeAmount: true, paidAmount: true, dueAmount: true },
    });
    return {
      totalCount,
      paid,
      pending,
      partial: overdue,
      totalFeeAmount: agg._sum.feeAmount ?? 0,
      totalPaid: agg._sum.paidAmount ?? 0,
      totalDue: agg._sum.dueAmount ?? 0,
    };
  },
};
