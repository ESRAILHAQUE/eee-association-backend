import type { Request, Response, NextFunction } from "express";
import { leaveService } from "./leave.service";

export const leaveController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request = await leaveService.create(req.user!, req.body);
      res.status(201).json({ success: true, data: request });
    } catch (err) {
      next(err);
    }
  },

  async getMy(req: Request, res: Response, next: NextFunction) {
    try {
      const requests = await leaveService.getMy(req.user!);
      res.json({ success: true, data: requests });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.query as Record<string, string>;
      const requests = await leaveService.getAll(req.user!, { status });
      res.json({ success: true, data: requests });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request = await leaveService.update(req.user!, req.params.id, req.body);
      res.json({ success: true, data: request });
    } catch (err) {
      next(err);
    }
  },
};
