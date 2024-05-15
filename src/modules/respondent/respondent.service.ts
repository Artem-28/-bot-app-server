import { Injectable } from '@nestjs/common';
import { RespondentRepository } from '@/repositories/respondent';
import { CreateRespondentDto } from '@/api/v1/respondent/dto';
import { ProjectRepository } from '@/repositories/project';
import { CommonError } from '@/common/error';
import { RespondentAggregate } from '@/modules/respondent/domain/respondent.aggregate';

@Injectable()
export class RespondentService {
  constructor(
    private readonly _respondentRepository: RespondentRepository,
    private readonly _projectRepository: ProjectRepository,
  ) {}

  public async create(dto: CreateRespondentDto, projectId: number) {
    const project = await this._projectRepository.getOne({
      field: 'id',
      value: projectId,
    });
    if (!project) {
      throw new CommonError(
        { field: null, ctx: 'app', message: 'errors.project.not_found' },
        404,
      );
    }

    let respondent: RespondentAggregate | null = null;
    if (dto.uuid) {
      respondent = await this._respondentRepository.getOne({
        field: 'uuid',
        value: dto.uuid,
      });
    }

    if (!respondent) {
      const newRespondent = RespondentAggregate.create(dto);
      respondent = await this._respondentRepository.create(
        newRespondent.instance,
      );
    }

    const result = await this._respondentRepository.addToProject(
      respondent.instance,
      project.instance,
    );
    console.log('DTO', dto);
    console.log('PROJECT_ID', result);
  }
}
