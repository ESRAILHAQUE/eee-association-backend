import type { Request, Response, NextFunction } from "express";
import { logsService } from "./logs.service";
import type { GetLoginLogsQuery } from "./logs.types";

export const logsController = {
  async getLoginLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, limit = "50" } = req.query as GetLoginLogsQuery;
      const logs = await logsService.getLoginLogs(userId, parseInt(limit, 10));
      res.json({ success: true, data: logs });
    } catch (err) {
      next(err);
    }
  },

  async getPasswordResetLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit = "50" } = req.query as { limit?: string };
      const logs = await logsService.getPasswordResetLogs(parseInt(limit, 10));
      res.json({ success: true, data: logs });
    } catch (err) {
      next(err);
    }
  },
};

