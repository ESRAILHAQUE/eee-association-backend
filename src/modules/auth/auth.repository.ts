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

  /**
   * Store a password reset token in PasswordResetHistory.
   * We encode the token and expiry together ("<token>:<expiresAt_iso>") in tokenUsed.
   */
  async createPasswordResetToken(
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<void> {
    await prisma.passwordResetHistory.create({
      data: {
        userId,
        tokenUsed: `${token}:${expiresAt.toISOString()}`,
      },
    });
  },

  /**
   * Look up a valid (unexpired, unused) password reset token.
   * Returns userId if valid, null otherwise.
   */
  async findValidResetToken(token: string): Promise<string | null> {
    const records = await prisma.passwordResetHistory.findMany({
      where: { tokenUsed: { startsWith: `${token}:` } },
      orderBy: { resetAt: "desc" },
      take: 1,
    });
    if (!records.length) return null;
    const record = records[0];
    const parts = record.tokenUsed?.split(":");
    if (!parts || parts.length < 2) return null;
    // rebuild ISO string (may contain colons): everything after first ":" segment
    const expiresAt = new Date(record.tokenUsed!.slice(token.length + 1));
    if (expiresAt < new Date()) return null; // expired
    return record.userId;
  },

  /** Consume (invalidate) a reset token by clearing tokenUsed */
  async consumeResetToken(token: string): Promise<void> {
    await prisma.passwordResetHistory.updateMany({
      where: { tokenUsed: { startsWith: `${token}:` } },
      data: { tokenUsed: null },
    });
  },
};
