import { Router } from "express";
import { body } from "express-validator";
import { feesController } from "./fees.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

// POST /fees — admin/CR creates a fee record for a student
router.post(
  "/",
  authMiddleware,
  requireRoles("admin", "cr", "super_admin"),
  validate([
    body("userId").notEmpty().withMessage("userId is required"),
    body("semesterNumber").isInt({ min: 1, max: 8 }).withMessage("semesterNumber must be 1-8"),
    body("feeAmount").isFloat({ min: 0 }).withMessage("feeAmount must be >= 0"),
  ]),
  feesController.create,
);

// GET /fees/my — member views their own fees
router.get("/my", authMiddleware, feesController.getMy);

// GET /fees/stats — admin/CR aggregate stats
router.get(
  "/stats",
  authMiddleware,
  requireRoles("cr", "admin", "super_admin"),
  feesController.getStats,
);

// GET /fees — admin/CR views all fees (CR auto-scoped to their batch)
router.get(
  "/",
  authMiddleware,
  requireRoles("cr", "admin", "super_admin"),
  feesController.getAll,
);

// PATCH /fees/:id/payment — admin/CR records a payment
router.patch(
  "/:id/payment",
  authMiddleware,
  requireRoles("admin", "cr", "super_admin"),
  validate([
    body("paidAmount").isFloat({ min: 0.01 }).withMessage("paidAmount must be > 0"),
    body("paymentMethod").optional().isString(),
    body("transactionReference").optional().isString(),
  ]),
  feesController.recordPayment,
);

export const feesRoutes = router;
