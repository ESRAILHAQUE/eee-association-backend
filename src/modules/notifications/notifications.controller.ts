import type { Request, Response, NextFunction } from "express";
import { notificationsService } from "./notifications.service";

export const notificationsController = {
  async send(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await notificationsService.send(req.user!, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getMy(req: Request, res: Response, next: NextFunction) {
    try {
      const notifications = await notificationsService.getMy(req.user!);
      res.json({ success: true, data: notifications });
    } catch (err) {
      next(err);
    }
  },

  async markAllRead(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await notificationsService.markAllRead(req.user!);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async markOneRead(req: Request, res: Response, next: NextFunction) {
    try {
      const notification = await notificationsService.markOneRead(req.user!, req.params.id);
      res.json({ success: true, data: notification });
    } catch (err) {
      next(err);
    }
  },
};
