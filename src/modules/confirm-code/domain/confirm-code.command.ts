import { validateSync } from 'class-validator';
import { IConfirmCode } from '@/modules/confirm-code/domain/confirm-code.interface';
import { hToArray } from '@/common/utils';
import { ConfirmCodeAggregate } from '@/modules/confirm-code/domain/confirm-code.aggregate';
import { CommonError } from '@/common/error';

type TValidateCodeField = 'confirmed' | 'delay' | 'live';

export class ConfirmCodeCommand {
  plainToInstance(this): void {
    validateSync(this, { whitelist: true });
  }

  update(this, data: Partial<IConfirmCode>): void {
    Object.assign(this, data);
  }

  setLiveTime(this, time: number): void {
    const timestamp = new Date().getTime();
    this.liveAt = new Date(timestamp + time * 1000);
  }

  setDelayTime(this, time: number): void {
    const timestamp = new Date().getTime();
    this.delayAt = new Date(timestamp + time * 1000);
  }

  confirm(this, value: string): void {
    this.confirmed = this.value === value;
  }

  validate(
    this: ConfirmCodeAggregate,
    throwExceptionField: TValidateCodeField | TValidateCodeField[],
  ) {
    hToArray(throwExceptionField).forEach((field) => {
      const valid = this[field];
      if (valid) return;
      throw new CommonError({
        ctx: 'field',
        field: 'code',
        message: `errors.confirm_code.${field}`,
      });
    });
  }
}
