import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { AppError } from "./errorHandler";

export function validate(validations: ValidationChain[]) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    await Promise.all(validations.map((v) => v.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }
    const first = errors.array()[0];
    const message =
      first && "msg" in first && typeof first.msg === "string"
        ? first.msg
        : "Validation failed";
    next(new AppError(400, message));
  };
}
