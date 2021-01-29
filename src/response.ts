import { Response } from "express";
import { RESPONSE_STATUS, STATUS_CODE } from "./@types/general";
import { formatToJSEND } from "./utils/formatToJSEND";

interface SuccessResponseType {
  res: Response;
  data: any;
  message: string;
  statusCode?: STATUS_CODE;
}

export const successResponse = ({
  res,
  data,
  statusCode = STATUS_CODE.SUCCESS,
  message,
}: SuccessResponseType) => {
  res
    .status(statusCode)
    .json(formatToJSEND({ data, status: RESPONSE_STATUS.SUCCESS, message }));
};
