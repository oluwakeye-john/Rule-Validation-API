import { RESPONSE_STATUS } from "../@types/general";

interface ResponseType {
  status: RESPONSE_STATUS;
  data: object | null;
  message: string;
}

export const formatToJSEND = ({ status, data, message }: ResponseType) => {
  if (!message.endsWith(".")) {
    message += ".";
  }
  return { message, status, data };
};
