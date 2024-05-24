import { Injectable } from '@nestjs/common';
import {
  CreateProjectDto,
  UpdateProjectDto,
} from '@/modules/project/service/dto';
import { ProjectRepository } from '@/repositories/project';
import { CommonError } from '@/common/error';
import { ProjectAggregate } from '@/models/project';

@Injectable()
export class ProjectService {
  constructor(private readonly _projectRepository: ProjectRepository) {}

  public async create(dto: CreateProjectDto): Promise<ProjectAggregate> {
    const project = ProjectAggregate.create(dto);
    return await this._projectRepository.create(project.instance);
  }

  public async update(dto: UpdateProjectDto): Promise<ProjectAggregate> {
    const project = await this._projectRepository.getOne({
      field: 'id',
      value: dto.id,
    });

    if (!project) {
      throw new CommonError(
        { field: null, ctx: 'app', message: 'errors.project.not_found' },
        404,
      );
    }

    const success = await this._projectRepository.update(dto.id, {
      title: dto.title,
    });

    if (!success) {
      throw new CommonError({
        field: null,
        ctx: 'app',
        message: 'errors.project.update',
      });
    }

    return ProjectAggregate.create({ ...project.instance, ...dto });
  }

  public async remove(id: number): Promise<boolean> {
    const project = await this._projectRepository.getOne({
      field: 'id',
      value: id,
    });

    if (!project) {
      throw new CommonError(
        { field: null, ctx: 'app', message: 'errors.project.not_found' },
        404,
      );
    }

    return await this._projectRepository.remove(id);
  }

  public async getAvailableUserProjects(
    userId: number,
  ): Promise<ProjectAggregate[]> {
    return await this._projectRepository.getMany({
      field: 'userId',
      value: userId,
    });
  }

  public async info(id: number): Promise<ProjectAggregate> {
    const project = await this._projectRepository.getOne({
      field: 'id',
      value: id,
    });

    if (!project) {
      throw new CommonError(
        { field: null, ctx: 'app', message: 'errors.project.not_found' },
        404,
      );
    }

    return project;
  }
}
