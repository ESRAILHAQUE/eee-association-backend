import { Router } from "express";
import { body } from "express-validator";
import { attendanceController } from "./attendance.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

// POST /attendance/qr/generate — CR or admin generates QR for an event
router.post(
  "/qr/generate",
  authMiddleware,
  requireRoles("cr", "admin", "super_admin"),
  validate([body("eventId").notEmpty().withMessage("eventId is required")]),
  attendanceController.generateQR,
);

// GET /attendance/qr/:eventId — CR or admin retrieves existing QR
router.get(
  "/qr/:eventId",
  authMiddleware,
  requireRoles("cr", "admin", "super_admin"),
  attendanceController.getQR,
);

// POST /attendance/scan — any authenticated member scans QR
router.post(
  "/scan",
  authMiddleware,
  validate([body("token").notEmpty().withMessage("token is required")]),
  attendanceController.scan,
);

// GET /attendance/event/:eventId — CR/admin lists attendees
router.get(
  "/event/:eventId",
  authMiddleware,
  requireRoles("cr", "admin", "super_admin"),
  attendanceController.listByEvent,
);

// GET /attendance/my — any authenticated user sees their history
router.get("/my", authMiddleware, attendanceController.getMy);

export const attendanceRoutes = router;
