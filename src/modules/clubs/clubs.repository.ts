import { prisma } from "../../database";

const clubSelect = {
  id: true,
  name: true,
  description: true,
  logoUrl: true,
  isActive: true,
  createdAt: true,
  _count: { select: { members: true } },
};

export const clubsRepository = {
  async create(data: { name: string; description: string; logoUrl?: string | null }) {
    return prisma.club.create({ data, select: clubSelect });
  },

  /** List all active clubs with member count */
  async findAllActive() {
    return prisma.club.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: clubSelect,
    });
  },

  async findById(id: string) {
    return prisma.club.findUnique({ where: { id }, select: clubSelect });
  },

  /** Check if a user is already a member of a club */
  async findMembership(clubId: string, userId: string) {
    return prisma.clubMember.findUnique({
      where: { clubId_userId: { clubId, userId } },
    });
  },

  async addMember(clubId: string, userId: string) {
    return prisma.clubMember.create({
      data: { clubId, userId },
      select: { id: true, clubId: true, userId: true, joinedAt: true },
    });
  },

  async removeMember(clubId: string, userId: string) {
    return prisma.clubMember.delete({
      where: { clubId_userId: { clubId, userId } },
    });
  },

  /** Get all clubs a specific user belongs to */
  async findByUser(userId: string) {
    return prisma.clubMember.findMany({
      where: { userId },
      include: {
        club: { select: clubSelect },
      },
      orderBy: { joinedAt: "desc" },
    });
  },

  /** Get all members of a specific club */
  async findMembers(clubId: string) {
    return prisma.clubMember.findMany({
      where: { clubId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            registrationNumber: true,
            profile: {
              select: {
                batch: true,
                rollNumber: true,
              }
            }
          }
        }
      },
      orderBy: { joinedAt: "desc" },
    });
  },
};
