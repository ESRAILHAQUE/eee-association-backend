import type { Request, Response, NextFunction } from "express";
import { noticesService } from "./notices.service";

export const noticesController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const notice = await noticesService.create(req.user!, req.body);
      res.status(201).json({ success: true, data: notice });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { batch, targetType } = req.query as Record<string, string>;
      const notices = await noticesService.getAll(req.user!, { batch, targetType });
      res.json({ success: true, data: notices });
    } catch (err) {
      next(err);
    }
  },

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      await noticesService.deleteNotice(req.user!, req.params.id);
      res.json({ success: true, message: "Notice deleted" });
    } catch (err) {
      next(err);
    }
  },

  async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const notice = await noticesService.updateNotice(req.user!, req.params.id, req.body);
      res.json({ success: true, data: notice });
    } catch (err) {
      next(err);
    }
  },
};
