import { Router } from "express";
import { body } from "express-validator";
import { projectsController } from "./projects.controller";
import { authMiddleware } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const createValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("abstract").trim().notEmpty().withMessage("Abstract is required"),
  body("category")
    .optional()
    .isIn(["iot", "matlab", "power", "embedded", "software", "research", "other"])
    .withMessage("Invalid category"),
  body("githubUrl").optional().isURL().withMessage("githubUrl must be a valid URL"),
  body("docUrl").optional().isURL().withMessage("docUrl must be a valid URL"),
];

// GET /projects — list all projects (filterable by category, batch)
router.get("/", authMiddleware, projectsController.getAll);

// POST /projects — any authenticated user submits a project
router.post(
  "/",
  authMiddleware,
  validate(createValidation),
  projectsController.create,
);

// POST /projects/:id/like — toggle like on a project
router.post("/:id/like", authMiddleware, projectsController.toggleLike);

// DELETE /projects/:id — owner or admin deletes a project
router.delete("/:id", authMiddleware, projectsController.deleteOne);

export const projectsRoutes = router;
