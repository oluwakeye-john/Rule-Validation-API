export enum STATUS_CODE {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum RESPONSE_STATUS {
  SUCCESS = "success",
  ERROR = "error",
}

export type CustomError = Error & {
  code: any;
  data: any;
};
