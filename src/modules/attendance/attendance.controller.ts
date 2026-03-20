import type { Request, Response, NextFunction } from "express";
import { attendanceService } from "./attendance.service";

export const attendanceController = {
  async generateQR(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = req.body as { eventId: string };
      const qr = await attendanceService.generateQR(req.user!, eventId);
      res.status(201).json({ success: true, data: qr });
    } catch (err) {
      next(err);
    }
  },

  async getQR(req: Request, res: Response, next: NextFunction) {
    try {
      const qr = await attendanceService.getQR(req.user!, req.params.eventId);
      res.json({ success: true, data: qr });
    } catch (err) {
      next(err);
    }
  },

  async scan(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body as { token: string };
      const record = await attendanceService.scan(req.user!, token);
      res.status(201).json({ success: true, data: record });
    } catch (err) {
      next(err);
    }
  },

  async listByEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const attendees = await attendanceService.listByEvent(req.user!, req.params.eventId);
      res.json({ success: true, data: attendees });
    } catch (err) {
      next(err);
    }
  },

  async getMy(req: Request, res: Response, next: NextFunction) {
    try {
      const history = await attendanceService.getMy(req.user!);
      res.json({ success: true, data: history });
    } catch (err) {
      next(err);
    }
  },
};
