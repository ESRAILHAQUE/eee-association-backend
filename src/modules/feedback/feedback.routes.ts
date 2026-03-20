import { Router } from "express";
import { body } from "express-validator";
import { feedbackController } from "./feedback.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const createValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("isAnonymous").optional().isBoolean(),
];

const updateValidation = [
  body("status")
    .optional()
    .isIn(["open", "in_progress", "resolved", "dismissed"])
    .withMessage("Invalid status"),
  body("resolution").optional().isString(),
];

// POST /feedback — any authenticated user submits feedback
router.post(
  "/",
  authMiddleware,
  validate(createValidation),
  feedbackController.create,
);

// GET /feedback — CR or admin views feedback (CR scoped to their batch)
router.get(
  "/",
  authMiddleware,
  requireRoles("cr", "admin", "super_admin"),
  feedbackController.getAll,
);

// PATCH /feedback/:id — CR or admin updates status/resolution
router.patch(
  "/:id",
  authMiddleware,
  requireRoles("cr", "admin", "super_admin"),
  validate(updateValidation),
  feedbackController.update,
);

export const feedbackRoutes = router;
