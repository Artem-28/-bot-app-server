import { CommonError } from '@/common/error';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IError } from '@/common/types';
import { EntityPropertyNotFoundError, QueryFailedError } from 'typeorm';

export const getExceptionStatus = (exception: any): number => {
  if (exception instanceof CommonError) {
    return exception.getStatus();
  }
  if (exception instanceof HttpException) {
    return exception.getStatus();
  }
  return HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getExceptionErrors = (exception: any): IError[] => {
  const errors: IError[] = [];
  if (exception instanceof CommonError) {
    return exception.getResponse();
  }
  if (exception instanceof EntityPropertyNotFoundError) {
    errors.push({ ctx: 'app', field: null, message: exception.message });
    return errors;
  }
  if (exception instanceof QueryFailedError) {
    errors.push({ ctx: 'app', field: null, message: exception.message });
    return errors;
  }
  const response = exception.getResponse();

  if (!response) return errors;

  if (typeof response === 'string') {
    errors.push({ ctx: 'app', field: null, message: response });
    return errors;
  }
  errors.push({ ctx: 'app', field: null, message: JSON.stringify(response) });
  return errors;
};
