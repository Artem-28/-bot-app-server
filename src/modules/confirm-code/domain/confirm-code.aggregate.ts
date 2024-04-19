import { ConfirmCodeCommand } from '@/modules/confirm-code/domain/command';
import {
  ConfirmCodeTypeEnum,
  IConfirmCode,
} from '@/modules/confirm-code/domain/confirm-code.interface';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { DomainError } from '@/common/error';

export class ConfirmCodeAggregate
  extends ConfirmCodeCommand
  implements IConfirmCode
{
  /** Идентификатор кода */
  @IsOptional()
  @IsNumber()
  id?: number;

  /** Значение кода */
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  value: string;

  /** Тип подтверждения кода */
  @IsDefined()
  @IsEnum(ConfirmCodeTypeEnum)
  type: ConfirmCodeTypeEnum;

  /** Адрес отправления кода */
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  destination: string;

  /** Срок действия кода */
  @IsDate()
  @IsNotEmpty()
  @IsDefined()
  expirationDate: Date;

  /** Дата создания кода */
  @IsDate()
  createdAt = new Date();

  /** Дата обновления кода */
  @IsDate()
  updatedAt = new Date();

  private constructor() {
    super();
  }

  static create(data: Partial<IConfirmCode>) {
    const _confirmCode = new ConfirmCodeAggregate();
    Object.assign(_confirmCode, data);
    _confirmCode.updatedAt = data?.id ? new Date() : _confirmCode.updatedAt;
    const errors = validateSync(_confirmCode, { whitelist: true });
    if (!!errors.length) {
      throw new DomainError(errors, { message: 'ConfirmCode not valid ' });
    }
    return _confirmCode;
  }
}
