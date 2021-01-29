import { NextFunction, Request, Response } from "express";
import { ValidationPayload } from "../@types/rule";
import { BadRequestException } from "../error";
import { ruleRequestValidation } from "../validation/payload.validation";

export const ruleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: ValidationPayload = req.body;

  const error = ruleRequestValidation(body);
  if (error) {
    next(new BadRequestException(error, null));
  }

  next();
};
