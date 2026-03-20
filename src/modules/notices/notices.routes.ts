import { Router } from "express";
import { body } from "express-validator";
import { noticesController } from "./notices.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const createValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("targetType")
    .optional()
    .isIn(["all", "batch_specific"])
    .withMessage("targetType must be all or batch_specific"),
  body("batch").optional().isString(),
  body("isPinned").optional().isBoolean(),
  body("isUrgent").optional().isBoolean(),
];

// All authenticated users can read notices
router.get("/", authMiddleware, noticesController.getAll);

// Only CR, admin, super_admin can post
router.post(
  "/",
  authMiddleware,
  requireRoles("cr", "admin", "super_admin"),
  validate(createValidation),
  noticesController.create,
);

// Update / delete — auth required, ownership enforced in service
router.patch("/:id", authMiddleware, requireRoles("cr", "admin", "super_admin"), noticesController.updateOne);
router.delete("/:id", authMiddleware, requireRoles("cr", "admin", "super_admin"), noticesController.deleteOne);

export const noticesRoutes = router;
