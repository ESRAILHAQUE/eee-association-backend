import { Request, Response, NextFunction } from "express";
import { env } from "../../config";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }

  const message =
    env.NODE_ENV === "production" ? "Internal server error" : err.message;
  const statusCode = 500;

  if (env.NODE_ENV === "development") {
    console.error(err);
  }

  res.status(statusCode).json({ success: false, message });
}
