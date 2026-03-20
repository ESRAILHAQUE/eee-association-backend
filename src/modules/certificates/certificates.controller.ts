import type { Request, Response, NextFunction } from "express";
import { certificatesService } from "./certificates.service";

export const certificatesController = {
  async issue(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await certificatesService.issue(req.user!, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getMy(req: Request, res: Response, next: NextFunction) {
    try {
      const certificates = await certificatesService.getMy(req.user!);
      res.json({ success: true, data: certificates });
    } catch (err) {
      next(err);
    }
  },

  async getByEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const certificates = await certificatesService.getByEvent(req.user!, req.params.eventId);
      res.json({ success: true, data: certificates });
    } catch (err) {
      next(err);
    }
  },
};
