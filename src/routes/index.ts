import { Router } from "express";
import { env } from "../config";
import { authRoutes } from "../modules/auth";

const router = Router();

router.use("/auth", authRoutes);

// Health check
router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "EEE Association API",
    env: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

export const routes = router;
