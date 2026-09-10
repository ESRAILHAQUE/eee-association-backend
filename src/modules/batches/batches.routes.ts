import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware, requireRoles } from "../../common/middleware";
import { validate } from "../../common/middleware/validate";
import { batchesController } from "./batches.controller";

const router = Router();

// Publicly readable or student readable? Usually auth is required for these.
router.use(authMiddleware);

// Get all batches
router.get("/", batchesController.getBatches);

// Admin-only routes
router.post(
  "/",
  requireRoles("admin", "super_admin"),
  validate([
    body("name").trim().notEmpty().withMessage("Batch name required"),
  ]),
  batchesController.createBatch
);

router.patch(
  "/:id/cr",
  requireRoles("admin", "super_admin"),
  batchesController.assignCR
);

export const batchesRoutes = router;
