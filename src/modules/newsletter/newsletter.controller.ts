import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../database";

// Newsletter items are stored as Notices with targetType=all and isUrgent=false as a workaround
// until a dedicated newsletter table is added. Future migration adds a Newsletter model.

export const newsletterController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const notices = await prisma.notice.findMany({
        where: { targetType: "all" },
        orderBy: { createdAt: "desc" },
        take: 50,
        select: {
          id: true,
          title: true,
          content: true,
          isPinned: true,
          createdAt: true,
          createdBy: { select: { id: true, fullName: true } },
        },
      });
      res.json({ success: true, data: notices });
    } catch (err) {
      next(err);
    }
  },

  async send(req: Request, res: Response, next: NextFunction) {
    try {
      const { subject, body: content } = req.body as { subject: string; body: string };
      // Store as a notice for now (all-target, pinned)
      const notice = await prisma.notice.create({
        data: {
          title: subject,
          content,
          targetType: "all",
          isPinned: false,
          isUrgent: false,
          createdById: req.user!.userId,
        },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          createdBy: { select: { id: true, fullName: true } },
        },
      });
      res.status(201).json({ success: true, data: notice, message: "Newsletter sent and saved" });
    } catch (err) {
      next(err);
    }
  },
};
