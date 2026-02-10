import { Request, Response, NextFunction } from "express";
import { usersService } from "./users.service";

export const usersController = {
  async getByRegNo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const registrationNumber = req.params.registrationNumber as string;
      const user =
        await usersService.getByRegistrationNumber(registrationNumber);
      res.status(200).json({ success: true, data: user });
    } catch (e) {
      next(e);
    }
  },

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const registrationNumber = req.params.registrationNumber as string;
      const body = req.body as Record<string, unknown>;
      const profile = await usersService.updateProfileByRegNo(
        registrationNumber,
        body,
      );
      res.status(200).json({ success: true, data: profile });
    } catch (e) {
      next(e);
    }
  },

  async setVerified(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const registrationNumber = req.params.registrationNumber as string;
      const isVerified = Boolean(req.body?.isVerified);
      const user = await usersService.setVerified(
        registrationNumber,
        isVerified,
      );
      res.status(200).json({ success: true, data: user });
    } catch (e) {
      next(e);
    }
  },
};
