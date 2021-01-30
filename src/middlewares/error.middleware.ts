import { NextFunction, Request, Response } from "express";
import { CustomError, RESPONSE_STATUS, STATUS_CODE } from "../@types/general";
import { VALIDATION_MESSAGES } from "../@types/messages";
import { formatToJSEND } from "../utils/formatToJSEND";

// middleware that handles all errors.

const handleErrors = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = err?.code;

  res.status(code || STATUS_CODE.INTERNAL_SERVER_ERROR);
  return res.json(
    formatToJSEND({
      status: RESPONSE_STATUS.ERROR,
      message: err.message || VALIDATION_MESSAGES.BASE_ERROR,
      data: err.data || null,
    })
  );
};

export default handleErrors;
