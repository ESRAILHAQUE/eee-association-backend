import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import type { LoginBody, RegisterBody } from "./auth.types";

export const authController = {
  async login(
    req: Request<object, object, LoginBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await authService.login(req.body);
      res.status(200).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  },

  async register(
    req: Request<object, object, RegisterBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  },

  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user!.userId;
      const result = await authService.getProfile(userId);
      res.status(200).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  },
};
