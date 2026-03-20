import type { Request, Response, NextFunction } from "express";
import { projectsService } from "./projects.service";

export const projectsController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectsService.create(req.user!, req.body);
      res.status(201).json({ success: true, data: project });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, batch } = req.query as Record<string, string>;
      const projects = await projectsService.getAll({ category, batch });
      res.json({ success: true, data: projects });
    } catch (err) {
      next(err);
    }
  },

  async toggleLike(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectsService.toggleLike(req.user!, req.params.id);
      res.json({ success: true, data: project });
    } catch (err) {
      next(err);
    }
  },

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      await projectsService.delete(req.user!, req.params.id);
      res.json({ success: true, message: "Project deleted" });
    } catch (err) {
      next(err);
    }
  },
};
