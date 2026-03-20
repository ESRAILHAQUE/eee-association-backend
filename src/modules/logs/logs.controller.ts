import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../database";

export const logsController = {
  async getLoginLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, limit = "50" } = req.query as Record<string, string>;
      const logs = await prisma.loginHistory.findMany({
        where: userId ? { userId } : {},
        orderBy: { loggedAt: "desc" },
        take: Math.min(parseInt(limit, 10), 200),
        select: {
          id: true,
          loggedAt: true,
          ip: true,
          userAgent: true,
          user: { select: { id: true, fullName: true, registrationNumber: true, currentRole: true } },
        },
      });
      res.json({ success: true, data: logs });
    } catch (err) {
      next(err);
    }
  },

  async getPasswordResetLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit = "50" } = req.query as Record<string, string>;
      const logs = await prisma.passwordResetHistory.findMany({
        orderBy: { resetAt: "desc" },
        take: Math.min(parseInt(limit, 10), 200),
        select: {
          id: true,
          resetAt: true,
          user: { select: { id: true, fullName: true, registrationNumber: true } },
        },
      });
      res.json({ success: true, data: logs });
    } catch (err) {
      next(err);
    }
  },
};
