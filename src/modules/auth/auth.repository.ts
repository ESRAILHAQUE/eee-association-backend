import { prisma } from "../../database";
import type { User } from "@prisma/client";
import type { AccountType, CurrentRole, GraduationStatus } from "@prisma/client";

export const authRepository = {
  async findByInstitutionalEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { institutionalEmail: email.toLowerCase().trim() },
    });
  },

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async create(data: {
    fullName: string;
    institutionalEmail: string;
    passwordHash: string;
    registrationNumber?: string;
    rollNumber?: string;
    batch?: string;
    session?: string;
    department?: string;
    program?: string;
    enrollmentYear?: number;
    graduationStatus?: "studying" | "graduated" | "dropped";
    accountType?: "student" | "alumni" | "teacher";
    personalEmail?: string;
    phoneNumber?: string;
    address?: string;
    currentRole?: string;
  }): Promise<User> {
    return prisma.user.create({
      data: {
        fullName: data.fullName,
        institutionalEmail: data.institutionalEmail.toLowerCase().trim(),
        passwordHash: data.passwordHash,
        registrationNumber: data.registrationNumber ?? null,
        rollNumber: data.rollNumber ?? null,
        batch: data.batch ?? null,
        session: data.session ?? null,
        department: data.department ?? null,
        program: data.program ?? null,
        enrollmentYear: data.enrollmentYear ?? null,
        graduationStatus: data.graduationStatus ?? "studying",
        accountType: data.accountType ?? "student",
        personalEmail: data.personalEmail ?? null,
        phoneNumber: data.phoneNumber ?? null,
        address: data.address ?? null,
        currentRole: (data.currentRole as "student" | "cr" | "moderator" | "admin" | "super_admin") ?? "student",
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
