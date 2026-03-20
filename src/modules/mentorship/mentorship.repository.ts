import { prisma } from "../../database";

const mentorSelect = {
  id: true,
  userId: true,
  expertise: true,
  bio: true,
  isActive: true,
  user: { select: { id: true, fullName: true, registrationNumber: true } },
};

const sessionSelect = {
  id: true,
  mentorId: true,
  menteeId: true,
  topic: true,
  scheduledAt: true,
  status: true,
  feedback: true,
  createdAt: true,
  mentor: {
    select: {
      id: true,
      user: { select: { id: true, fullName: true } },
    },
  },
  mentee: { select: { id: true, fullName: true } },
};

export const mentorshipRepository = {
  /** Create a mentor profile */
  async createMentorProfile(data: { userId: string; expertise: string[]; bio: string }) {
    return prisma.mentorProfile.create({ data, select: mentorSelect });
  },

  /** Find mentor profile by userId */
  async findMentorByUserId(userId: string) {
    return prisma.mentorProfile.findUnique({ where: { userId }, select: mentorSelect });
  },

  /** List all active mentors */
  async findActiveMentors() {
    return prisma.mentorProfile.findMany({
      where: { isActive: true },
      orderBy: { id: "asc" },
      select: mentorSelect,
    });
  },

  /** Find mentor profile by id */
  async findMentorById(id: string) {
    return prisma.mentorProfile.findUnique({ where: { id }, select: mentorSelect });
  },

  /** Create a session request */
  async createSession(data: {
    mentorId: string;
    menteeId: string;
    topic: string;
    scheduledAt: Date;
  }) {
    return prisma.mentorSession.create({ data, select: sessionSelect });
  },

  /** Get all sessions where user is mentor or mentee */
  async findSessionsByUser(userId: string) {
    return prisma.mentorSession.findMany({
      where: {
        OR: [
          { menteeId: userId },
          { mentor: { userId } },
        ],
      },
      orderBy: { scheduledAt: "asc" },
      select: sessionSelect,
    });
  },
};
