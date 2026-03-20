import { Router } from "express";
import { body } from "express-validator";
import { newsletterController } from "./newsletter.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

router.get(
  "/",
  authMiddleware,
  requireRoles("admin", "super_admin"),
  newsletterController.getAll,
);

router.post(
  "/send",
  authMiddleware,
  requireRoles("super_admin"),
  validate([
    body("subject").trim().notEmpty().withMessage("subject is required"),
    body("body").trim().notEmpty().withMessage("body is required"),
  ]),
  newsletterController.send,
);

export const newsletterRoutes = router;
