import { STATUS_CODE } from "./@types/general";

class BaseError extends Error {
  private data: any;
  constructor(message: string, data: Object | null) {
    super();
    this.message = message;
    this.data = data;
  }
}

export class BadRequestException extends BaseError {
  code = STATUS_CODE.BAD_REQUEST;
}

export class NotFoundException extends BaseError {
  code = STATUS_CODE.NOT_FOUND;
}

export class InternalServerErrorException extends BaseError {
  code = STATUS_CODE.INTERNAL_SERVER_ERROR;
}
