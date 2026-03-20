import type { Request, Response, NextFunction } from "express";
import { feedbackService } from "./feedback.service";

export const feedbackController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const feedback = await feedbackService.create(req.user!, req.body);
      res.status(201).json({ success: true, data: feedback });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, batch } = req.query as Record<string, string>;
      const feedback = await feedbackService.getAll(req.user!, { status, batch });
      res.json({ success: true, data: feedback });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const feedback = await feedbackService.update(req.user!, req.params.id, req.body);
      res.json({ success: true, data: feedback });
    } catch (err) {
      next(err);
    }
  },
};
