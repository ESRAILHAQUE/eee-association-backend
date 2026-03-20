import type { Request, Response, NextFunction } from "express";
import { feesService } from "./fees.service";

export const feesController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const actor = { userId: req.user!.userId, role: req.user!.role ?? "" };
      const fee = await feesService.createFee(actor, req.body);
      res.status(201).json({ success: true, data: fee });
    } catch (err) {
      next(err);
    }
  },

  async recordPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const actor = { userId: req.user!.userId, role: req.user!.role ?? "" };
      const fee = await feesService.recordPayment(actor, req.params.id, req.body);
      res.json({ success: true, data: fee });
    } catch (err) {
      next(err);
    }
  },

  async getMy(req: Request, res: Response, next: NextFunction) {
    try {
      const fees = await feesService.getMyFees(req.user!.userId);
      res.json({ success: true, data: fees });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { batch, status } = req.query as Record<string, string>;
      const role = req.user!.role;
      let fees;
      if (role === "cr") {
        fees = await feesService.getBatchFees(req.user!, { status });
      } else {
        fees = await feesService.getAllFees({ batch, status });
      }
      res.json({ success: true, data: fees });
    } catch (err) {
      next(err);
    }
  },

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const role = req.user!.role;
      let stats;
      if (role === "cr") {
        stats = await feesService.getBatchStats(req.user!);
      } else {
        const { batch } = req.query as Record<string, string>;
        stats = await feesService.getStats(batch);
      }
      res.json({ success: true, data: stats });
    } catch (err) {
      next(err);
    }
  },
};
