import { Request, Response, NextFunction } from "express";
import { usersService } from "./users.service";

export const usersController = {
  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params.id;
      const { user: userUpdate, profile: profileUpdate } = req.body;
      const result = await usersService.updateUserById(userId, userUpdate || {}, profileUpdate || {});
      res.status(200).json({ success: true, data: result });
    } catch (e) {
      next(e);
    }
  },

  async getList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { role, batch, search } = req.query;
      const filters: any = {
        role: role as string,
        batch: batch as string,
        search: search as string,
      };

      const user = (req as any).user;
      if (user?.currentRole === "cr") {
        const { prisma } = require("../../database");
        const controlledBatch = await prisma.batch.findUnique({
          where: { crId: user.id },
        });
        if (controlledBatch) {
          filters.batch = controlledBatch.name;
        } else {
          // If the CR doesn't control any batch, they shouldn't see anyone
          filters.batch = "___NONE___"; 
        }
      }

      const users = await usersService.listUsers(filters);
      res.status(200).json({ success: true, data: users });
    } catch (e) {
      next(e);
    }
  },

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

  async setVerifiedById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.params.id as string;
      const user = await usersService.setVerifiedById(
        userId,
        true, // verify sets to true
      );
      res.status(200).json({ success: true, data: user });
    } catch (e) {
      next(e);
    }
  },

  async toggleBlock(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.params.id as string;
      const isBlock = Boolean(req.body?.isBlock);
      const user = await usersService.setBlock(userId, isBlock);
      res.status(200).json({ success: true, data: user });
    } catch (e) {
      next(e);
    }
  },

  async updateRole(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.params.id as string;
      const role = req.body?.role as string;
      const user = await usersService.updateRole(userId, role);
      res.status(200).json({ success: true, data: user });
    } catch (e) {
      next(e);
    }
  },

  async updateMyProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user!.userId;
      const body = req.body as { personalEmail?: string; phoneNumber?: string };
      const profile = await usersService.updateMyProfile(userId, {
        personalEmail: body.personalEmail,
        phoneNumber: body.phoneNumber,
      });
      res.status(200).json({ success: true, data: profile });
    } catch (e) {
      next(e);
    }
  },
};
