import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import type { LoginBody, RegisterBody, ForgotPasswordBody, ResetPasswordBody } from "./auth.types";


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

  async forgotPassword(
    req: Request<object, object, ForgotPasswordBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await authService.forgotPassword(req.body);
      res.status(200).json({ success: true, ...result });
    } catch (e) {
      next(e);
    }
  },

  async resetPassword(
    req: Request<object, object, ResetPasswordBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await authService.resetPassword(req.body);
      res.status(200).json({ success: true, ...result });
    } catch (e) {
      next(e);
    }
  },
};
