import { Router } from "express";
import { env } from "../config";
import { authRoutes } from "../modules/auth";
import { usersRoutes } from "../modules/users";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);

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
