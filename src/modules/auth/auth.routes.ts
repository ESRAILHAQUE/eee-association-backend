import { Router } from "express";
import { body } from "express-validator";
import { authController } from "./auth.controller";
import { authMiddleware } from "../../common/middleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Valid institutional email required"),
  body("password").notEmpty().withMessage("Password required"),
];

const registerValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name required"),
  body("email").isEmail().normalizeEmail().withMessage("Valid institutional email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("registrationNumber").optional().trim(),
  body("rollNumber").optional().trim(),
  body("batch").optional().trim(),
  body("session").optional().trim(),
  body("department").optional().trim(),
  body("program").optional().trim(),
  body("enrollmentYear").optional().isInt({ min: 1990, max: 2030 }),
  body("graduationStatus").optional().isIn(["studying", "graduated", "dropped"]),
  body("accountType").optional().isIn(["student", "alumni", "teacher"]),
  body("personalEmail").optional().isEmail().normalizeEmail(),
  body("phoneNumber").optional().trim(),
  body("address").optional().trim(),
  body("currentRole").optional().isIn(["student", "cr", "moderator", "admin", "super_admin"]),
];

router.post("/login", validate(loginValidation), authController.login);
router.post("/register", validate(registerValidation), authController.register);
router.get("/me", authMiddleware, authController.getProfile);

export const authRoutes = router;
