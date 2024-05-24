import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { DomainError } from '@/common/error';
import { IProject } from '@/models/project/project.interface';

export class ProjectAggregate implements IProject {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsDefined()
  @IsNumber()
  userId: number;

  @IsDefined()
  @IsString()
  title: string;

  @IsDate()
  createdAt = new Date();

  @IsDate()
  updatedAt = new Date();

  static create(data: Partial<IProject>) {
    const _project = new ProjectAggregate();
    Object.assign(_project, data);
    _project.updatedAt = data?.id ? new Date() : _project.updatedAt;
    const errors = validateSync(_project, { whitelist: true });
    if (!!errors.length) {
      throw new DomainError(errors, { message: 'Project not valid ' });
    }
    return _project;
  }

  get instance(): IProject {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
