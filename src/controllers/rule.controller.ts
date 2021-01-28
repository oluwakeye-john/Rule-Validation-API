import { Request, response, Response } from "express";
import { RESPONSE_STATUS, STATUS_CODE } from "../@types/general";
import { BadRequestException } from "../error";
import { formatToJSEND } from "../utils/formatToJSEND";
import { ruleRequestValidation } from "../validation/payload.validation";
import { ValidationPayload } from "../@types/rule";
import { validateField } from "../validation/rule.validation";

const me = {
  name: "Oluwakeye John",
  github: "@oluwakeye-john",
  email: "bjohnoluwakeye@gmail.com",
  mobile: "07053643618",
  twitter: "@oluwakeyejohn",
};

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

    const { valid, message } = validateField(body);

    if (valid) {
      const response = {
        status: RESPONSE_STATUS.SUCCESS,
        message,
        data: {
          error: false,
          field: body.rule.field,
          field_value: body.data,
          condition: body.rule.condition,
          condition_value: body.rule.condition_value,
        },
      };
      res.status(200).json(formatToJSEND(response));
    } else {
      throw new BadRequestException(message, null);
    }
  };

  return { base, validateRule };
};
export default ruleController();
