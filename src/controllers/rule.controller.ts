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

    const isValid = validateField(body);

    if (isValid) {
      const response = {
        status: RESPONSE_STATUS.SUCCESS,
        message: `field ${body.data} successfully validated.`,
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
      const response = formatToJSEND({
        status: RESPONSE_STATUS.ERROR,
        message: `field ${body.rule.field} failed validation.`,
        data: null,
      });
      res.status(200).json(formatToJSEND(response));
    }
  };

  return { base, validateRule };
};
export default ruleController();
