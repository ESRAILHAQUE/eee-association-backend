import type { Request, Response, NextFunction } from "express";
import { newsletterService } from "./newsletter.service";
import type { SendNewsletterBody } from "./newsletter.types";

export const newsletterController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await newsletterService.getAll();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async send(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as SendNewsletterBody;
      const notice = await newsletterService.send(body, req.user!.userId);
      res.status(201).json({ success: true, data: notice, message: "Newsletter sent and saved" });
    } catch (err) {
      next(err);
    }
  },
};

