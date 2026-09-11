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

  async addCR(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const batchId = req.params.id as string;
      const crId = req.body.crId as string;
      const batch = await batchesService.addCR(batchId, crId);
      res.status(200).json({ success: true, data: batch });
    } catch (e) {
      next(e);
    }
  },

  async removeCR(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const batchId = req.params.id as string;
      const crId = req.params.crId as string;
      const batch = await batchesService.removeCR(batchId, crId);
      res.status(200).json({ success: true, data: batch });
    } catch (e) {
      next(e);
    }
  },

  async deleteBatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const batchId = req.params.id as string;
      await batchesService.deleteBatch(batchId);
      res.status(200).json({ success: true, message: "Batch deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
};
