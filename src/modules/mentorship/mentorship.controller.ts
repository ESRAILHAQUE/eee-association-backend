import type { Request, Response, NextFunction } from "express";
import { mentorshipService } from "./mentorship.service";

export const mentorshipController = {
  async registerMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await mentorshipService.registerMentor(req.user!, req.body);
      res.status(201).json({ success: true, data: profile });
    } catch (err) {
      next(err);
    }
  },

  async getMentors(_req: Request, res: Response, next: NextFunction) {
    try {
      const mentors = await mentorshipService.getMentors();
      res.json({ success: true, data: mentors });
    } catch (err) {
      next(err);
    }
  },

  async requestSession(req: Request, res: Response, next: NextFunction) {
    try {
      const session = await mentorshipService.requestSession(req.user!, req.body);
      res.status(201).json({ success: true, data: session });
    } catch (err) {
      next(err);
    }
  },

  async getMySessions(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await mentorshipService.getMySessions(req.user!);
      res.json({ success: true, data: sessions });
    } catch (err) {
      next(err);
    }
  },
};
