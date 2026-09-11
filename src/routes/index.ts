import { Router } from "express";
import { env } from "../config";
import { authRoutes } from "../modules/auth";
import { usersRoutes } from "../modules/users";
import { noticesRoutes } from "../modules/notices";
import { eventsRoutes } from "../modules/events";
import { notificationsRoutes } from "../modules/notifications";
import { attendanceRoutes } from "../modules/attendance";
import { certificatesRoutes } from "../modules/certificates";
import { feedbackRoutes } from "../modules/feedback";
import { leaveRoutes } from "../modules/leave";
import { resourcesRoutes } from "../modules/resources";
import { clubsRoutes } from "../modules/clubs";
import { projectsRoutes } from "../modules/projects";
import { mentorshipRoutes } from "../modules/mentorship";
import { documentsRoutes } from "../modules/documents";
import { forumRoutes } from "../modules/forum";
import { feesRoutes } from "../modules/fees";
import { analyticsRoutes } from "../modules/analytics";
import { logsRoutes } from "../modules/logs";
import { newsletterRoutes } from "../modules/newsletter";
import { batchesRoutes } from "../modules/batches";
import { homepageRoutes } from "../modules/homepage";
const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/batches", batchesRoutes);
router.use("/notices", noticesRoutes);
router.use("/events", eventsRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/certificates", certificatesRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/leave", leaveRoutes);
router.use("/resources", resourcesRoutes);
router.use("/clubs", clubsRoutes);
router.use("/projects", projectsRoutes);
router.use("/mentorship", mentorshipRoutes);
router.use("/documents", documentsRoutes);
router.use("/forum", forumRoutes);
router.use("/fees", feesRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/logs", logsRoutes);
router.use("/newsletter", newsletterRoutes);
console.log("homepageRoutes is:", homepageRoutes);
router.use("/homepage", homepageRoutes);
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
