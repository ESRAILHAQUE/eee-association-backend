import type { Request, Response, NextFunction } from "express";
import { clubsService } from "./clubs.service";

export const clubsController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const club = await clubsService.create(req.user!, req.body);
      res.status(201).json({ success: true, data: club });
    } catch (err) {
      next(err);
    }
  },

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const clubs = await clubsService.getAll();
      res.json({ success: true, data: clubs });
    } catch (err) {
      next(err);
    }
  },

  async join(req: Request, res: Response, next: NextFunction) {
    try {
      const membership = await clubsService.join(req.user!, req.params.id);
      res.status(201).json({ success: true, data: membership });
    } catch (err) {
      next(err);
    }
  },

  async leave(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await clubsService.leave(req.user!, req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const members = await clubsService.getMembers(req.user!, req.params.id);
      res.json({ success: true, data: members });
    } catch (err) {
      next(err);
    }
  },

  async getMy(req: Request, res: Response, next: NextFunction) {
    try {
      const clubs = await clubsService.getMy(req.user!);
      res.json({ success: true, data: clubs });
    } catch (err) {
      next(err);
    }
  },

  async deleteClub(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await clubsService.deleteClub(req.user!, req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },
};
