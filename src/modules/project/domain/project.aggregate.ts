import { ProjectCommand } from '@/modules/project/domain/project.command';
import { IProject } from '@/modules/project/domain/project.interface';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { DomainError } from '@/common/error';

export class ProjectAggregate extends ProjectCommand implements IProject {
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

  private constructor() {
    super();
  }

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
