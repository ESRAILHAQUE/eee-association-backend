import { Router } from "express";
import { body } from "express-validator";
import { leaveController } from "./leave.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const createValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("reason").trim().notEmpty().withMessage("Reason is required"),
  body("leaveDate").isISO8601().withMessage("leaveDate must be a valid ISO date"),
  body("returnDate").isISO8601().withMessage("returnDate must be a valid ISO date"),
];

const updateValidation = [
  body("status")
    .isIn(["approved", "rejected"])
    .withMessage("status must be approved or rejected"),
  body("reviewNote").optional().isString(),
];

// POST /leave — any authenticated user submits a leave request
router.post(
  "/",
  authMiddleware,
  validate(createValidation),
  leaveController.create,
);

// GET /leave/my — member sees their own requests
router.get("/my", authMiddleware, leaveController.getMy);

// GET /leave — CR or admin sees requests (CR scoped to their batch)
router.get(
  "/",
  authMiddleware,
  requireRoles("cr", "admin", "super_admin"),
  leaveController.getAll,
);

// PATCH /leave/:id — CR or admin approves/rejects
router.patch(
  "/:id",
  authMiddleware,
  requireRoles("cr", "admin", "super_admin"),
  validate(updateValidation),
  leaveController.update,
);

export const leaveRoutes = router;
