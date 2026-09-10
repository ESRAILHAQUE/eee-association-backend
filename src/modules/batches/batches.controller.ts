import { Request, Response, NextFunction } from "express";
import { batchesService } from "./batches.service";

export const batchesController = {
  async getBatches(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const batches = await batchesService.getBatches();
      res.status(200).json({ success: true, data: batches });
    } catch (e) {
      next(e);
    }
  },

  async createBatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const name = req.body.name as string;
      const batch = await batchesService.createBatch(name);
      res.status(201).json({ success: true, data: batch });
    } catch (e) {
      next(e);
    }
  },

  async assignCR(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const batchId = req.params.id as string;
      const crId = req.body.crId as string | null;
      const batch = await batchesService.assignCR(batchId, crId);
      res.status(200).json({ success: true, data: batch });
    } catch (e) {
      next(e);
    }
  }
};
