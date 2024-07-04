import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { DomainError } from '@/common/error';
import { IScript } from '@/models/script';

export class ScriptAggregate implements IScript {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsDefined()
  @IsNumber()
  projectId: number;

  @IsDefined()
  @IsString()
  title: string;

  @IsDate()
  createdAt = new Date();

  @IsDate()
  updatedAt = new Date();

  static create(data: Partial<IScript>) {
    const _script = new ScriptAggregate();
    Object.assign(_script, data);
    _script.updatedAt = data?.id ? new Date() : _script.updatedAt;
    const errors = validateSync(_script, { whitelist: true });
    if (!!errors.length) {
      throw new DomainError(errors, { message: 'Script not valid ' });
    }
    return _script;
  }

  get instance(): IScript {
    return {
      projectId: this.projectId,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
