import { hToArray } from '@/common/utils';
import { IError } from '@/common/types';
import { HttpStatus } from '@nestjs/common';

export class CommonError extends Error {
  private readonly _status: HttpStatus | number = 500;
  private readonly _response: IError[] = [];

  constructor(error: IError | IError[], status?: number) {
    const errors = hToArray(error);
    super(JSON.stringify(errors));

    this._response = errors;
    this._status = status || HttpStatus.INTERNAL_SERVER_ERROR;
  }

  getStatus() {
    return this._status;
  }

  getResponse() {
    return this._response;
  }
}
