import type { Request, Response, NextFunction } from "express";
import { documentsService } from "./documents.service";

export const documentsController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.query as Record<string, string>;
      const documents = await documentsService.getAll({ category });
      res.json({ success: true, data: documents });
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const document = await documentsService.create(req.user!, req.body);
      res.status(201).json({ success: true, data: document });
    } catch (err) {
      next(err);
    }
  },

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      await documentsService.delete(req.user!, req.params.id);
      res.json({ success: true, message: "Document deleted" });
    } catch (err) {
      next(err);
    }
  },
};
