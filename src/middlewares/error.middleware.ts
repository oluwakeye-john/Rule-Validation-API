import { NextFunction, Request, Response } from "express";
import { CustomError, RESPONSE_STATUS } from "../@types/general";
import { formatToJSEND } from "../utils/formatToJSEND";

const handleErrors = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = err?.code;

  return res.status(code).json(
    formatToJSEND({
      status: RESPONSE_STATUS.ERROR,
      message: err.message,
      data: err.data,
    })
  );
};

export default handleErrors;
