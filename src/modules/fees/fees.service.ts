import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../../database";
import { feesRepository } from "./fees.repository";

export const feesService = {
  /** Admin/CR: create fee records (bulk or single) */
  async createFee(
    actor: { userId: string; role: string },
    data: { userId: string; semesterNumber: number; feeAmount: number },
  ) {
    return feesRepository.upsert({
      userId: data.userId,
      semesterNumber: data.semesterNumber,
      feeAmount: new Decimal(data.feeAmount),
    });
  },

  /** Admin/CR: record payment */
  async recordPayment(
    actor: { userId: string; role: string },
    feeId: string,
    data: { paidAmount: number; paymentMethod?: string; transactionReference?: string },
  ) {
    return feesRepository.recordPayment(feeId, {
      paidAmount: new Decimal(data.paidAmount),
      paymentMethod: data.paymentMethod,
      transactionReference: data.transactionReference,
    });
  },

  /** Member: get my own fee records */
  async getMyFees(userId: string) {
    return feesRepository.findByUser(userId);
  },

  /** Admin: get all fees, optional filters */
  async getAllFees(filters?: { batch?: string; status?: string }) {
    return feesRepository.findAll(filters);
  },

  /** CR: scoped to their batch */
  async getBatchFees(actor: { userId: string }, filters?: { status?: string }) {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: actor.userId },
      select: { batch: true },
    });
    if (!profile?.batch) throw new Error("CR has no batch assigned");
    return feesRepository.findByBatch(profile.batch, filters);
  },

  /** Admin: aggregate stats */
  async getStats(batch?: string) {
    return feesRepository.getStats(batch);
  },

  /** CR: stats for own batch */
  async getBatchStats(actor: { userId: string }) {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: actor.userId },
      select: { batch: true },
    });
    return feesRepository.getStats(profile?.batch ?? undefined);
  },
};
