import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware, requireRoles } from "../../common/middleware";
import { validate } from "../../common/middleware/validate";
import { usersController } from "./users.controller";

const router = Router();

// All routes require auth
router.use(authMiddleware);

router.get(
  "/",
  requireRoles("cr", "admin", "super_admin"),
  usersController.getList
);

router.patch(
  "/:id/verify",
  requireRoles("admin", "super_admin"),
  usersController.setVerifiedById
);

router.patch(
  "/:id/block",
  requireRoles("admin", "super_admin"),
  validate([
    body("isBlock").isBoolean().withMessage("isBlock must be boolean"),
  ]),
  usersController.toggleBlock
);

router.patch(
  "/:id/role",
  requireRoles("admin", "super_admin"),
  validate([
    body("role").trim().notEmpty().withMessage("Role is required"),
  ]),
  usersController.updateRole
);

// Get user + profile by registration number (for admin panel)
router.get("/by-reg/:registrationNumber", requireRoles("admin", "super_admin"), usersController.getByRegNo);

// Upsert profile by registration number (push details one by one)
router.patch(
  "/by-reg/:registrationNumber/profile",
  requireRoles("admin", "super_admin"),
  usersController.updateProfile,
);

// Approve user (set isVerified = true)
router.patch(
  "/by-reg/:registrationNumber/verify",
  requireRoles("admin", "super_admin"),
  validate([
    body("isVerified").isBoolean().withMessage("isVerified must be boolean"),
  ]),
  usersController.setVerified,
);

export const usersRoutes = router;
