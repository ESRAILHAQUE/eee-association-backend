import { Router } from "express";
import { body } from "express-validator";
import { documentsController } from "./documents.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const createValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("fileUrl").trim().notEmpty().isURL().withMessage("fileUrl must be a valid URL"),
  body("fileType").trim().notEmpty().withMessage("fileType is required"),
  body("category").trim().notEmpty().withMessage("category is required"),
  body("description").optional().isString(),
  body("accessLevel").optional().isString(),
];

// GET /documents — list documents filtered by category (any authenticated user)
router.get("/", authMiddleware, documentsController.getAll);

// POST /documents — admin/super_admin uploads document metadata
router.post(
  "/",
  authMiddleware,
  requireRoles("admin", "super_admin"),
  validate(createValidation),
  documentsController.create,
);

// DELETE /documents/:id — admin/super_admin deletes a document
router.delete(
  "/:id",
  authMiddleware,
  requireRoles("admin", "super_admin"),
  documentsController.deleteOne,
);

export const documentsRoutes = router;
