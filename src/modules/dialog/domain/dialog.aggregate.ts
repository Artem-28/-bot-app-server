import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  validateSync,
} from 'class-validator';
import { DomainError } from '@/common/error';
import { DialogCommand } from '@/modules/dialog/domain/dialog.command';
import { IDialog } from '@/modules/dialog/domain/dialog.interface';

export class DialogAggregate extends DialogCommand implements IDialog {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsDefined()
  @IsNumber()
  projectId: number;

  @IsDefined()
  @IsNumber()
  scriptId: number;

  @IsDefined()
  @IsNumber()
  respondentId: number;

  @IsDate()
  createdAt = new Date();

  @IsDate()
  updatedAt = new Date();

  private constructor() {
    super();
  }

  static create(data: Partial<IDialog>) {
    const _dialog = new DialogAggregate();
    Object.assign(_dialog, data);
    _dialog.updatedAt = data?.id ? new Date() : _dialog.updatedAt;
    const errors = validateSync(_dialog, { whitelist: true });
    if (!!errors.length) {
      throw new DomainError(errors, { message: 'Dialog not valid ' });
    }
    return _dialog;
  }

  get instance(): IDialog {
    return {
      projectId: this.projectId,
      scriptId: this.scriptId,
      respondentId: this.respondentId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
