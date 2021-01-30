import { RESPONSE_STATUS } from "../@types/general";

interface ResponseType {
  status: RESPONSE_STATUS;
  data: object | null;
  message: string;
}

const checkPunctuation = (val: string): string => {
  // checks if punctuation is missing and adds it
  if (!val.endsWith(".")) {
    val += ".";
  }
  return val;
};

export const formatToJSEND = ({ status, data, message }: ResponseType) => {
  message = checkPunctuation(message);
  return { message, status, data };
};
