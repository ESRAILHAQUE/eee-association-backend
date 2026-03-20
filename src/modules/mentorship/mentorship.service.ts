import { AppError } from "../../common/middleware";
import { mentorshipRepository } from "./mentorship.repository";
import type { RegisterMentorBody, RequestSessionBody } from "./mentorship.types";
import type { JwtPayload } from "../../common/middleware/authMiddleware";

export const mentorshipService = {
  /** Register the authenticated user as a mentor */
  async registerMentor(actor: JwtPayload, body: RegisterMentorBody) {
    const existing = await mentorshipRepository.findMentorByUserId(actor.userId);
    if (existing) throw new AppError(409, "You already have a mentor profile");

    return mentorshipRepository.createMentorProfile({
      userId: actor.userId,
      expertise: body.expertise,
      bio: body.bio,
    });
  },

  /** List all active mentors */
  async getMentors() {
    return mentorshipRepository.findActiveMentors();
  },

  /** Request a mentorship session */
  async requestSession(actor: JwtPayload, body: RequestSessionBody) {
    const scheduledAt = new Date(body.scheduledAt);
    if (isNaN(scheduledAt.getTime())) {
      throw new AppError(400, "scheduledAt must be a valid ISO date");
    }
    if (scheduledAt <= new Date()) {
      throw new AppError(400, "scheduledAt must be in the future");
    }

    const mentor = await mentorshipRepository.findMentorById(body.mentorId);
    if (!mentor) throw new AppError(404, "Mentor not found");
    if (!mentor.isActive) throw new AppError(400, "Mentor is not currently active");

    // Prevent self-session
    if (mentor.userId === actor.userId) {
      throw new AppError(400, "You cannot request a session with yourself");
    }

    return mentorshipRepository.createSession({
      mentorId: body.mentorId,
      menteeId: actor.userId,
      topic: body.topic,
      scheduledAt,
    });
  },

  /** Get all sessions for the current user (as mentor or mentee) */
  async getMySessions(actor: JwtPayload) {
    return mentorshipRepository.findSessionsByUser(actor.userId);
  },
};
