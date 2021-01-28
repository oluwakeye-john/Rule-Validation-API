import { Request, Response } from "express";
import { RESPONSE_STATUS, STATUS_CODE } from "../@types/general";
import { ValidationPayload } from "../@types/rule";
import { BadRequestException } from "../error";
import { me } from "../personal-info";
import { formatToJSEND } from "../utils/formatToJSEND";
import { ruleRequestValidation } from "../validation/payload.validation";
import { validateField } from "../validation/rule.validation";

const ruleController = () => {
  const base = (req: Request, res: Response) => {
    res.status(STATUS_CODE.SUCCESS).json(
      formatToJSEND({
        status: RESPONSE_STATUS.SUCCESS,
        message: "My Rule-Validation API",
        data: me,
      })
    );
  };

  const validateRule = (req: Request, res: Response) => {
    const body: ValidationPayload = req.body;

    const error = ruleRequestValidation(body);
    if (error) {
      throw new BadRequestException(error, null);
    }

    const { valid, message, responsePayload } = validateField(body);

    if (valid) {
      const response = {
        status: RESPONSE_STATUS.SUCCESS,
        message,
        data: responsePayload,
      };
      res.status(200).json(formatToJSEND(response));
    } else {
      throw new BadRequestException(message, responsePayload);
    }
  };

  return { base, validateRule };
};
export default ruleController();
