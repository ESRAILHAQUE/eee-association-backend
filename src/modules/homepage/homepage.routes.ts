import { Router } from "express";
import { homepageController } from "./homepage.controller";
import { authMiddleware, requireRoles } from "../../common/middleware";
import { body } from "express-validator";
import { validate } from "../../common/middleware";

const router = Router();

// Validation schema for updates
const updateValidations = [
  body("hero").optional().isArray(),
  body("achievements").optional().isArray(),
  body("clubs").optional().isArray(),
  body("events").optional().isArray(),
];

// Public endpoint
router.get("/", homepageController.getSettings);

// Admin only
router.put(
  "/",
  authMiddleware,
  requireRoles("super_admin", "admin"),
  updateValidations,
  validate,
  homepageController.updateSettings
);

export const homepageRoutes = router;
