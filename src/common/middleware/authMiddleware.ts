import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config";
import { AppError } from "./errorHandler";

export interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    next(new AppError(401, "Authentication required"));
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    next(new AppError(401, "Invalid or expired token"));
  }
}

/** Optional: allow only certain roles */
export function requireRoles(...allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(401, "Authentication required"));
      return;
    }
    if (allowedRoles.length && !allowedRoles.includes(req.user.role ?? "")) {
      next(new AppError(403, "Insufficient permissions"));
      return;
    }
    next();
  };
}
