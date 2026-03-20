import type { Request, Response, NextFunction } from "express";
import { eventsService } from "./events.service";

export const eventsController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await eventsService.create(req.user!, req.body);
      res.status(201).json({ success: true, data: event });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, targetBatch } = req.query as Record<string, string>;
      const events = await eventsService.getAll(req.user!, { status, targetBatch });
      res.json({ success: true, data: events });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await eventsService.getById(req.params.id);
      res.json({ success: true, data: event });
    } catch (err) {
      next(err);
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await eventsService.updateStatus(
        req.user!,
        req.params.id,
        req.body.status,
      );
      res.json({ success: true, data: event });
    } catch (err) {
      next(err);
    }
  },

  async rsvp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await eventsService.rsvp(req.user!, req.params.id);
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async cancelRsvp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await eventsService.cancelRsvp(req.user!, req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async listRsvps(req: Request, res: Response, next: NextFunction) {
    try {
      const rsvps = await eventsService.listRsvps(req.user!, req.params.id);
      res.json({ success: true, data: rsvps });
    } catch (err) {
      next(err);
    }
  },

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      await eventsService.deleteEvent(req.user!, req.params.id);
      res.json({ success: true, message: "Event deleted" });
    } catch (err) {
      next(err);
    }
  },
};
