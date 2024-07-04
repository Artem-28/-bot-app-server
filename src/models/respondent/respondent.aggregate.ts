import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { DomainError } from '@/common/error';
import { randomUUID } from 'crypto';
import { IRespondent } from '@/models/respondent/respondent.interface';

export class RespondentAggregate implements IRespondent {
  @IsString()
  uuid = randomUUID();

  @IsOptional()
  @IsNumber()
  id?: number;

  @IsDefined()
  @IsNumber()
  projectId: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name = null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName = null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  surname = null;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone = null;

  @IsDate()
  createdAt = new Date();

  @IsDate()
  updatedAt = new Date();

  static create(data: Partial<IRespondent> = {}) {
    const _respondent = new RespondentAggregate();
    Object.assign(_respondent, data);
    _respondent.updatedAt = data?.id ? new Date() : _respondent.updatedAt;
    const errors = validateSync(_respondent, { whitelist: true });
    if (!!errors.length) {
      throw new DomainError(errors, { message: 'Respondent not valid ' });
    }
    return _respondent;
  }

  get instance(): IRespondent {
    return {
      id: this.id,
      projectId: this.projectId,
      uuid: this.uuid,
      name: this.name,
      lastName: this.lastName,
      surname: this.surname,
      phone: this.phone,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
