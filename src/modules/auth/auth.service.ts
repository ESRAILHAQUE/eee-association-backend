import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../../config";
import { authRepository } from "./auth.repository";
import { AppError } from "../../common/middleware";
import type {
  LoginBody,
  RegisterBody,
  AuthResponse,
  RegisterResponse,
  ForgotPasswordBody,
  ResetPasswordBody,
} from "./auth.types";
import type { JwtPayload } from "../../common/middleware";

const SALT_ROUNDS = 10;

function signToken(payload: JwtPayload, expiresIn: string): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn } as jwt.SignOptions);
}

export const authService = {
  async login(body: LoginBody): Promise<AuthResponse> {
    const user = await authRepository.findByInstitutionalEmail(body.email);
    if (!user) throw new AppError(401, "Invalid email or password");

    if (user.isDeleted) throw new AppError(403, "Account is deactivated");
    if (user.isBlock) throw new AppError(403, "Account is blocked");
    if (user.accountLocked) throw new AppError(403, "Account is locked");
    // Unverified users can login but get limited (pending) dashboard access

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
      registrationNumber: user.registrationNumber,
      isVerified: user.isVerified,
    };
    const accessToken = signToken(payload, env.JWT_EXPIRES_IN);

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        institutionalEmail: user.institutionalEmail,
        registrationNumber: user.registrationNumber,
        currentRole: user.currentRole,
        isVerified: user.isVerified,
      },
      accessToken,
      expiresIn: env.JWT_EXPIRES_IN,
    };
  },

  async register(body: RegisterBody): Promise<RegisterResponse> {
    const email = body.email.toLowerCase().trim();
    const existing = await authRepository.findByInstitutionalEmail(email);
    if (existing)
      throw new AppError(409, "Institutional email already registered");

    const regNo = body.registrationNumber.trim();
    const existingReg = await authRepository.findByRegistrationNumber(regNo);
    if (existingReg)
      throw new AppError(409, "Registration number already registered");

    const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS);
    const user = await authRepository.create({
      fullName: body.fullName.trim(),
      institutionalEmail: email,
      passwordHash,
      registrationNumber: regNo,
    });

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        institutionalEmail: user.institutionalEmail,
        isVerified: user.isVerified,
      },
      message:
        "Registration successful. You can sign in now; dashboard access will be limited until admin approves your account.",
    };
  },

  async getProfile(
    userId: string,
  ): Promise<{
    user: AuthResponse["user"];
    profile?: unknown;
    pending: boolean;
  }> {
    const user = await authRepository.findByIdWithProfile(userId);
    if (!user) throw new AppError(404, "User not found");
    if (user.isDeleted) throw new AppError(403, "Account is deactivated");

    const base = {
      id: user.id,
      fullName: user.fullName,
      institutionalEmail: user.institutionalEmail,
      registrationNumber: user.registrationNumber,
      currentRole: user.currentRole,
      isVerified: user.isVerified,
    };

    if (!user.isVerified) {
      return { user: base, pending: true };
    }
    return {
      user: base,
      profile: user.profile ?? null,
      pending: false,
    };
  },

  /**
   * Initiate password reset: generate token, store it, send email.
   * In development, the reset token is returned in the response.
   * In production, an email is sent (requires SMTP env vars).
   */
  async forgotPassword(body: ForgotPasswordBody): Promise<{ message: string; devToken?: string }> {
    const email = body.email.toLowerCase().trim();
    const user = await authRepository.findByInstitutionalEmail(email);
    // Don't reveal whether email exists
    if (!user || user.isDeleted) {
      return { message: "If this email is registered, a reset link has been sent." };
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await authRepository.createPasswordResetToken(user.id, token, expiresAt);

    if (env.NODE_ENV !== "production") {
      // Development: return token directly so it can be tested without SMTP
      return {
        message: "[DEV MODE] Password reset token generated. Use it at POST /api/auth/reset-password.",
        devToken: token,
      };
    }

    // Production: send email via nodemailer (requires SMTP_HOST, SMTP_USER, SMTP_PASS env vars)
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT ?? "587", 10),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      const resetUrl = `${process.env.FRONTEND_URL ?? "http://localhost:3000"}/reset-password?token=${token}`;
      await transporter.sendMail({
        from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
        to: user.institutionalEmail,
        subject: "EEE Association — Password Reset",
        html: `<p>Hello ${user.fullName},</p><p>Click the link below to reset your password. This link expires in 1 hour.</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you did not request this, ignore this email.</p>`,
      });
    } catch {
      // Log but don't expose email failure to the user
    }

    return { message: "If this email is registered, a reset link has been sent." };
  },

  /** Complete the password reset using a valid token */
  async resetPassword(body: ResetPasswordBody): Promise<{ message: string }> {
    const { token, newPassword } = body;
    if (!token || !newPassword || newPassword.length < 6) {
      throw new AppError(400, "Token and new password (min 6 chars) are required");
    }

    const userId = await authRepository.findValidResetToken(token);
    if (!userId) throw new AppError(400, "Invalid or expired reset token");

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await authRepository.updatePasswordHash(userId, passwordHash);
    await authRepository.consumeResetToken(token);

    return { message: "Password has been reset successfully. You can now log in with your new password." };
  },
};
