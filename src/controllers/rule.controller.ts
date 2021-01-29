import { Request, Response } from "express";
import { VALIDATION_MESSAGES } from "../@types/messages";
import { BadRequestException } from "../error";
import PersonalRepo from "../repository/personalRepo";
import { successResponse } from "../response";
import { validateField } from "../validation/rule.validation";

const ruleController = () => {
  const base = (req: Request, res: Response) => {
    const data = PersonalRepo.getUser();

    successResponse({
      res,
      data,
      message: VALIDATION_MESSAGES.BASE_ROUTE,
    });
  };

  const validateRule = (req: Request, res: Response): void => {
    const body = req.body;
    const { valid, message, responsePayload: data } = validateField(body);

    if (!valid) {
      throw new BadRequestException(message, data);
    }

    successResponse({ res, data, message });
  };

  return { base, validateRule };
};
export default ruleController();
