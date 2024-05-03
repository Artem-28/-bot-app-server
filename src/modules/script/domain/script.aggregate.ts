import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { DomainError } from '@/common/error';
import { ScriptCommand } from '@/modules/script/domain/script.command';
import { IScript } from '@/modules/script/domain/script.interface';

export class ScriptAggregate extends ScriptCommand implements IScript {
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

  private constructor() {
    super();
  }

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
