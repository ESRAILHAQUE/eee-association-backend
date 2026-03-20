import { Router } from "express";
import { body } from "express-validator";
import { notificationsController } from "./notifications.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const sendValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),
  body("userIds").optional().isArray().withMessage("userIds must be an array"),
  body("userIds.*").optional().isString(),
  body("batch").optional().isString(),
];

// POST /notifications/send — admin or CR sends notifications
router.post(
  "/send",
  authMiddleware,
  requireRoles("admin", "super_admin", "cr"),
  validate(sendValidation),
  notificationsController.send,
);

// GET /notifications/my — any authenticated user gets their own notifications
router.get("/my", authMiddleware, notificationsController.getMy);

// PATCH /notifications/read-all — mark all as read
router.patch("/read-all", authMiddleware, notificationsController.markAllRead);

// PATCH /notifications/:id/read — mark one as read
router.patch("/:id/read", authMiddleware, notificationsController.markOneRead);

export const notificationsRoutes = router;
