import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config";
import { authRepository } from "./auth.repository";
import { AppError } from "../../common/middleware";
import type { LoginBody, RegisterBody, AuthResponse } from "./auth.types";
import type { JwtPayload } from "../../common/middleware";

const SALT_ROUNDS = 10;

function signToken(payload: JwtPayload, expiresIn: string): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}

export const authService = {
  async login(body: LoginBody): Promise<AuthResponse> {
    const user = await authRepository.findByInstitutionalEmail(body.email);
    if (!user) throw new AppError(401, "Invalid email or password");

    if (!user.isActive) throw new AppError(403, "Account is deactivated");
    if (user.isDeleted) throw new AppError(403, "Account is deactivated");
    if (user.accountLocked) throw new AppError(403, "Account is locked");

    const match = await bcrypt.compare(body.password, user.passwordHash);
    if (!match) {
      await authRepository.incrementFailedAttempts(user.id);
      throw new AppError(401, "Invalid email or password");
    }

    await authRepository.recordLogin(user.id);

    const payload: JwtPayload = {
      userId: user.id,
      email: user.institutionalEmail,
      role: user.currentRole,
    };
    const accessToken = signToken(payload, env.JWT_EXPIRES_IN);

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        institutionalEmail: user.institutionalEmail,
        currentRole: user.currentRole,
        accountType: user.accountType,
        emailVerified: user.emailVerified,
      },
      accessToken,
      expiresIn: env.JWT_EXPIRES_IN,
    };
  },

  async register(body: RegisterBody): Promise<AuthResponse> {
    const email = body.email.toLowerCase().trim();
    const existing = await authRepository.findByInstitutionalEmail(email);
    if (existing) throw new AppError(409, "Institutional email already registered");

    const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS);
    const user = await authRepository.create({
      fullName: body.fullName,
      institutionalEmail: email,
      passwordHash,
      registrationNumber: body.registrationNumber,
      rollNumber: body.rollNumber,
      batch: body.batch,
      session: body.session,
      department: body.department,
      program: body.program,
      enrollmentYear: body.enrollmentYear,
      graduationStatus: body.graduationStatus,
      accountType: body.accountType,
      personalEmail: body.personalEmail,
      phoneNumber: body.phoneNumber,
      address: body.address,
      currentRole: body.currentRole,
    });

    const payload: JwtPayload = {
      userId: user.id,
      email: user.institutionalEmail,
      role: user.currentRole,
    };
    const accessToken = signToken(payload, env.JWT_EXPIRES_IN);

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        institutionalEmail: user.institutionalEmail,
        currentRole: user.currentRole,
        accountType: user.accountType,
        emailVerified: user.emailVerified,
      },
      accessToken,
      expiresIn: env.JWT_EXPIRES_IN,
    };
  },

  async getProfile(userId: string): Promise<AuthResponse["user"]> {
    const user = await authRepository.findById(userId);
    if (!user) throw new AppError(404, "User not found");
    if (!user.isActive) throw new AppError(403, "Account is deactivated");
    if (user.isDeleted) throw new AppError(403, "Account is deactivated");

    return {
      id: user.id,
      fullName: user.fullName,
      institutionalEmail: user.institutionalEmail,
      currentRole: user.currentRole,
      accountType: user.accountType,
      emailVerified: user.emailVerified,
    };
  },
};
