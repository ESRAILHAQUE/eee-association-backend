import { Router } from "express";
import { logsController } from "./logs.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";

const router = Router();

router.get(
  "/logins",
  authMiddleware,
  requireRoles("admin", "super_admin"),
  logsController.getLoginLogs,
);

router.get(
  "/password-resets",
  authMiddleware,
  requireRoles("admin", "super_admin"),
  logsController.getPasswordResetLogs,
);

export const logsRoutes = router;
