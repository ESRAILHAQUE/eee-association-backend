import { Router } from "express";
import { body } from "express-validator";
import { certificatesController } from "./certificates.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const issueValidation = [
  body("eventId").notEmpty().withMessage("eventId is required"),
  body("userIds").isArray({ min: 1 }).withMessage("userIds must be a non-empty array"),
  body("userIds.*").isString().withMessage("Each userId must be a string"),
];

// POST /certificates/issue — admin or CR bulk-issues certificates
router.post(
  "/issue",
  authMiddleware,
  requireRoles("admin", "super_admin", "cr"),
  validate(issueValidation),
  certificatesController.issue,
);

// GET /certificates/my — any authenticated user gets their own certificates
router.get("/my", authMiddleware, certificatesController.getMy);

// GET /certificates/event/:eventId — CR or admin lists certificates for an event
router.get(
  "/event/:eventId",
  authMiddleware,
  requireRoles("cr", "admin", "super_admin"),
  certificatesController.getByEvent,
);

export const certificatesRoutes = router;
