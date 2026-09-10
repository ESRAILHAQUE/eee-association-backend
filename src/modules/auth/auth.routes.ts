import { Router } from "express";
import { body } from "express-validator";
import { authController } from "./auth.controller";
import { authMiddleware } from "../../common/middleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid institutional email required"),
  body("password").notEmpty().withMessage("Password required"),
];

const registerValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name required"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid institutional email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("registrationNumber")
    .trim()
    .notEmpty()
    .withMessage("Registration number required"),
];

router.post("/login", validate(loginValidation), authController.login);
router.post("/register", validate(registerValidation), authController.register);
router.get("/me", authMiddleware, authController.getProfile);

router.post(
  "/forgot-password",
  validate([body("email").isEmail().normalizeEmail().withMessage("Valid email required")]),
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  validate([
    body("token").trim().notEmpty().withMessage("Token is required"),
    body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
  ]),
  authController.resetPassword,
);

export const authRoutes = router;
