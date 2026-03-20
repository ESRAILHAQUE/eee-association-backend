import { Router } from "express";
import { body } from "express-validator";
import { eventsController } from "./events.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const createValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("venue").trim().notEmpty().withMessage("Venue is required"),
  body("startAt").isISO8601().withMessage("startAt must be a valid ISO date"),
  body("endAt").isISO8601().withMessage("endAt must be a valid ISO date"),
  body("eventType")
    .optional()
    .isIn(["workshop", "seminar", "competition", "cultural", "meeting", "other"]),
  body("maxCapacity").optional().isInt({ min: 1 }),
  body("targetBatch").optional().isString(),
];

// All authenticated users can read events
router.get("/", authMiddleware, eventsController.getAll);
router.get("/:id", authMiddleware, eventsController.getById);
router.get("/:id/rsvps", authMiddleware, eventsController.listRsvps);

// Create: CR, moderator, admin, super_admin
router.post(
  "/",
  authMiddleware,
  requireRoles("cr", "moderator", "admin", "super_admin"),
  validate(createValidation),
  eventsController.create,
);

// Status change: admin, super_admin, moderator
router.patch(
  "/:id/status",
  authMiddleware,
  requireRoles("admin", "super_admin", "moderator"),
  body("status")
    .isIn(["draft", "published", "cancelled", "completed"])
    .withMessage("Invalid status"),
  eventsController.updateStatus,
);

// RSVP: any authenticated user
router.post("/:id/rsvp", authMiddleware, eventsController.rsvp);
router.delete("/:id/rsvp", authMiddleware, eventsController.cancelRsvp);

// Delete: creator or admin
router.delete("/:id", authMiddleware, eventsController.deleteOne);

export const eventsRoutes = router;
