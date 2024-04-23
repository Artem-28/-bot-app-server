import { BaseResponse } from '@/common/response/base.response';
import { IError } from '@/common/types';
import { ArgumentsHost } from '@nestjs/common';
import { getExceptionErrors, getExceptionStatus } from '@/common/utils';

export class ErrorResponse extends BaseResponse {
  public errors: IError[];

  constructor(exception: any, host: ArgumentsHost) {
    super(host);
    this.errors = getExceptionErrors(exception);
    this.statusCode = getExceptionStatus(exception);
    this.success = false;
  }
}
