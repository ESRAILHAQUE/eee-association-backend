import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config";
import { authRepository } from "./auth.repository";
import { AppError } from "../../common/middleware";
import type {
  LoginBody,
  RegisterBody,
  AuthResponse,
  RegisterResponse,
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
};
