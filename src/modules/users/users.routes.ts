import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware, requireRoles } from "../../common/middleware";
import { validate } from "../../common/middleware/validate";
import { usersController } from "./users.controller";

const router = Router();

// All routes require auth + admin or super_admin
router.use(authMiddleware);
router.use(requireRoles("admin", "super_admin"));

// Get user + profile by registration number (for admin panel)
router.get("/by-reg/:registrationNumber", usersController.getByRegNo);

// Upsert profile by registration number (push details one by one)
router.patch(
  "/by-reg/:registrationNumber/profile",
  usersController.updateProfile,
);

// Approve user (set isVerified = true)
router.patch(
  "/by-reg/:registrationNumber/verify",
  validate([
    body("isVerified").isBoolean().withMessage("isVerified must be boolean"),
  ]),
  usersController.setVerified,
);

export const usersRoutes = router;
