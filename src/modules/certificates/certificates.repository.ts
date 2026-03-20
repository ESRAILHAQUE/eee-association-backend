import { prisma } from "../../database";

const certSelect = {
  id: true,
  issuedAt: true,
  user: { select: { id: true, fullName: true, registrationNumber: true } },
  event: { select: { id: true, title: true } },
  issuedBy: { select: { id: true, fullName: true } },
};

export const certificatesRepository = {
  /** Bulk-issue certificates. Skips duplicates via skipDuplicates. */
  async createMany(data: { userId: string; eventId: string; issuedById: string }[]) {
    return prisma.certificate.createMany({ data, skipDuplicates: true });
  },

  /** Get all certificates received by a user */
  async findByUser(userId: string) {
    return prisma.certificate.findMany({
      where: { userId },
      orderBy: { issuedAt: "desc" },
      select: certSelect,
    });
  },

  /** Get all certificates for an event */
  async findByEvent(eventId: string) {
    return prisma.certificate.findMany({
      where: { eventId },
      orderBy: { issuedAt: "asc" },
      select: certSelect,
    });
  },
};
