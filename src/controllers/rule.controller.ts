import { Request, Response } from "express";
import { RESPONSE_STATUS, STATUS_CODE } from "../@types/general";
import { formatToJSEND } from "../utils/formatToJSEND";

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
        data: me,
        message: "My Rule-Validation API",
      })
    );
  };

  return { base };
};

export default ruleController();
