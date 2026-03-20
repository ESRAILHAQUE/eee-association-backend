import { Router } from "express";
import { body } from "express-validator";
import { mentorshipController } from "./mentorship.controller";
import { authMiddleware } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const registerValidation = [
  body("expertise")
    .isArray({ min: 1 })
    .withMessage("expertise must be a non-empty array"),
  body("expertise.*").isString(),
  body("bio").trim().notEmpty().withMessage("bio is required"),
];

const sessionValidation = [
  body("mentorId").notEmpty().withMessage("mentorId is required"),
  body("topic").trim().notEmpty().withMessage("topic is required"),
  body("scheduledAt").isISO8601().withMessage("scheduledAt must be a valid ISO date"),
];

// POST /mentorship/register — any authenticated user registers as mentor
router.post(
  "/register",
  authMiddleware,
  validate(registerValidation),
  mentorshipController.registerMentor,
);

// GET /mentorship/mentors — list active mentors
router.get("/mentors", authMiddleware, mentorshipController.getMentors);

// POST /mentorship/sessions — request a session
router.post(
  "/sessions",
  authMiddleware,
  validate(sessionValidation),
  mentorshipController.requestSession,
);

// GET /mentorship/sessions/my — get my sessions (as mentor or mentee)
router.get("/sessions/my", authMiddleware, mentorshipController.getMySessions);

export const mentorshipRoutes = router;
