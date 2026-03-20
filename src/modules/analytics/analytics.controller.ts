import type { Request, Response, NextFunction } from "express";
import { analyticsService } from "./analytics.service";

export const analyticsController = {
  async getOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await analyticsService.getOverview();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async getBatchOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const { batch } = req.params;
      const data = await analyticsService.getBatchOverview(batch);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
};
