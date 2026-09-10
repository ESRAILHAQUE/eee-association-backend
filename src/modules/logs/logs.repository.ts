import { prisma } from "../../database";

export const logsRepository = {
  async findLoginLogs(userId?: string, limit = 50) {
    return prisma.loginHistory.findMany({
      where: userId ? { userId } : {},
      orderBy: { loggedAt: "desc" },
      take: Math.min(limit, 200),
      select: {
        id: true,
        loggedAt: true,
        ip: true,
        userAgent: true,
        user: {
          select: {
            id: true,
            fullName: true,
            registrationNumber: true,
            currentRole: true,
          },
        },
      },
    });
  },

  async findPasswordResetLogs(limit = 50) {
    return prisma.passwordResetHistory.findMany({
      orderBy: { resetAt: "desc" },
      take: Math.min(limit, 200),
      select: {
        id: true,
        resetAt: true,
        user: {
          select: {
            id: true,
            fullName: true,
            registrationNumber: true,
          },
        },
      },
    });
  },
};
