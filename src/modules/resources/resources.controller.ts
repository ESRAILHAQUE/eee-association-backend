import type { Request, Response, NextFunction } from "express";
import { resourcesService } from "./resources.service";

export const resourcesController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const resource = await resourcesService.create(req.user!, req.body);
      res.status(201).json({ success: true, data: resource });
    } catch (err) {
      next(err);
    }
  },

  async getApproved(req: Request, res: Response, next: NextFunction) {
    try {
      const { subject, semester } = req.query as Record<string, string>;
      const resources = await resourcesService.getApproved({ subject, semester });
      res.json({ success: true, data: resources });
    } catch (err) {
      next(err);
    }
  },

  async getPending(req: Request, res: Response, next: NextFunction) {
    try {
      const resources = await resourcesService.getPending(req.user!);
      res.json({ success: true, data: resources });
    } catch (err) {
      next(err);
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const resource = await resourcesService.updateStatus(req.user!, req.params.id, req.body);
      res.json({ success: true, data: resource });
    } catch (err) {
      next(err);
    }
  },
};
