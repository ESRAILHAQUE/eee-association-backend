import { prisma } from "../../database";
import type { User } from "@prisma/client";

export const authRepository = {
  async findByInstitutionalEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { institutionalEmail: email.toLowerCase().trim() },
    });
  },

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async findByRegistrationNumber(registrationNumber: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { registrationNumber: registrationNumber.trim() },
    });
  },

  async findByIdWithProfile(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  },

  async create(data: {
    fullName: string;
    institutionalEmail: string;
    passwordHash: string;
    registrationNumber: string;
  }): Promise<User> {
    return prisma.user.create({
      data: {
        fullName: data.fullName,
        institutionalEmail: data.institutionalEmail.toLowerCase().trim(),
        passwordHash: data.passwordHash,
        registrationNumber: data.registrationNumber.trim(),
      },
    });
  },

  async updatePasswordHash(
    userId: string,
    passwordHash: string
  ): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
  },

  async recordLogin(userId: string): Promise<void> {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          lastLoginAt: new Date(),
          failedLoginAttempts: 0,
        },
      }),
      prisma.loginHistory.create({
        data: { userId },
      }),
    ]);
  },

  async incrementFailedAttempts(userId: string): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: { increment: 1 },
      },
    });
  },
};
