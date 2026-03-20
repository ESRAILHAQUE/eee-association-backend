import { Router } from "express";
import { body } from "express-validator";
import { resourcesController } from "./resources.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const createValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("subject").trim().notEmpty().withMessage("Subject is required"),
  body("fileUrl").trim().notEmpty().isURL().withMessage("fileUrl must be a valid URL"),
  body("fileType").trim().notEmpty().withMessage("fileType is required"),
  body("description").optional().isString(),
  body("semester").optional().isInt({ min: 1, max: 8 }).withMessage("semester must be between 1 and 8"),
];

const statusValidation = [
  body("status")
    .isIn(["approved", "rejected"])
    .withMessage("status must be approved or rejected"),
];

// POST /resources — any authenticated user uploads resource metadata
router.post(
  "/",
  authMiddleware,
  validate(createValidation),
  resourcesController.create,
);

// GET /resources — list approved resources (any authenticated user)
router.get("/", authMiddleware, resourcesController.getApproved);

// GET /resources/pending — moderator/admin sees pending resources
router.get(
  "/pending",
  authMiddleware,
  requireRoles("moderator", "admin", "super_admin"),
  resourcesController.getPending,
);

// PATCH /resources/:id/status — moderator/admin approves or rejects
router.patch(
  "/:id/status",
  authMiddleware,
  requireRoles("moderator", "admin", "super_admin"),
  validate(statusValidation),
  resourcesController.updateStatus,
);

export const resourcesRoutes = router;
