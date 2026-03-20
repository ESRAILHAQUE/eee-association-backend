import { Router } from "express";
import { analyticsController } from "./analytics.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";

const router = Router();

// GET /analytics/overview — super_admin / admin
router.get(
  "/overview",
  authMiddleware,
  requireRoles("admin", "super_admin"),
  analyticsController.getOverview,
);

// GET /analytics/batch/:batch — admin, CR (CR can only see their own batch ideally — enforced in service)
router.get(
  "/batch/:batch",
  authMiddleware,
  requireRoles("cr", "admin", "super_admin"),
  analyticsController.getBatchOverview,
);

export const analyticsRoutes = router;
