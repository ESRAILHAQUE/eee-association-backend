import { Router } from "express";
import { body } from "express-validator";
import { clubsController } from "./clubs.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const createValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("logoUrl").optional().isURL().withMessage("logoUrl must be a valid URL"),
];

// GET /clubs — list all active clubs with member count (any authenticated user)
router.get("/", authMiddleware, clubsController.getAll);

// GET /clubs/:id/members
router.get("/:id/members", authMiddleware, requireRoles("admin", "super_admin"), clubsController.getMembers);

// GET /clubs/my — member sees their clubs
router.get("/my", authMiddleware, clubsController.getMy);

// POST /clubs — admin creates a club
router.post(
  "/",
  authMiddleware,
  requireRoles("admin", "super_admin"),
  validate(createValidation),
  clubsController.create,
);

// POST /clubs/:id/join — member joins a club
router.post("/:id/join", authMiddleware, clubsController.join);

// DELETE /clubs/:id/leave — member leaves a club
router.delete("/:id/leave", authMiddleware, clubsController.leave);

// DELETE /clubs/:id — admin deletes a club
router.delete("/:id", authMiddleware, requireRoles("admin", "super_admin"), clubsController.deleteClub);

export const clubsRoutes = router;
