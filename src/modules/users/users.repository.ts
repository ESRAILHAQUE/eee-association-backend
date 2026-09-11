import { prisma } from "../../database";

export const usersRepository = {
  async findByRegistrationNumber(registrationNumber: string) {
    return prisma.user.findUnique({
      where: { registrationNumber: registrationNumber.trim() },
      include: { profile: true },
    });
  },

  async findMany(filters: { role?: string; batch?: string; search?: string }) {
    const where: any = {};
    if (filters.role) where.currentRole = filters.role;
    if (filters.search) {
      where.OR = [
        { fullName: { contains: filters.search, mode: "insensitive" } },
        { registrationNumber: { contains: filters.search, mode: "insensitive" } },
      ];
    }
    if (filters.batch) {
      where.profile = { batch: filters.batch };
    }
    
    return prisma.user.findMany({
      where,
      include: { profile: true },
      orderBy: { fullName: 'asc' },
    });
  },

  async upsertProfile(
    userId: string,
    registrationNumber: string,
    data: Record<string, unknown>,
  ) {
    return prisma.userProfile.upsert({
      where: { userId },
      create: {
        user: { connect: { id: userId } },
        registrationNumber,
        ...data,
      },
      update: data,
    });
  },

  async setVerified(userId: string, isVerified: boolean) {
    return prisma.user.update({
      where: { id: userId },
      data: { isVerified },
    });
  },

  async setBlock(userId: string, isBlock: boolean) {
    return prisma.user.update({
      where: { id: userId },
      data: { isBlock },
    });
  },

  async updateRole(userId: string, role: any) {
    return prisma.user.update({
      where: { id: userId },
      data: { currentRole: role },
    });
  },

  async updateMyProfile(userId: string, data: { personalEmail?: string; phoneNumber?: string }) {
    // We only update if the profile exists, otherwise it might fail if they are somehow missing a profile record
    return prisma.userProfile.update({
      where: { userId },
      data,
    });
  },

  async updateUser(userId: string, userUpdate: any, profileUpdate: any) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        ...userUpdate,
        profile: {
          upsert: {
            create: { ...profileUpdate, registrationNumber: userUpdate.registrationNumber || undefined },
            update: profileUpdate
          }
        }
      },
      include: { profile: true }
    });
  }
};
