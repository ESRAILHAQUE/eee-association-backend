import { prisma } from "../../database";

export const usersRepository = {
  async findByRegistrationNumber(registrationNumber: string) {
    return prisma.user.findUnique({
      where: { registrationNumber: registrationNumber.trim() },
      include: { profile: true },
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
};
