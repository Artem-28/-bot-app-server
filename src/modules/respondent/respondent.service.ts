import { Injectable } from '@nestjs/common';
import { RespondentRepository } from '@/repositories/respondent';
import { ProjectRepository } from '@/repositories/project';
import { CommonError } from '@/common/error';
import { RespondentAggregate } from '@/modules/respondent/domain/respondent.aggregate';
import { CreateRespondentDto } from '@/modules/respondent/dto';

@Injectable()
export class RespondentService {
  constructor(
    private readonly _respondentRepository: RespondentRepository,
    private readonly _projectRepository: ProjectRepository,
  ) {}

  public async create(dto: CreateRespondentDto) {
    const project = await this._projectRepository.getOne({
      field: 'id',
      value: dto.projectId,
    });
    if (!project) {
      throw new CommonError(
        { field: null, ctx: 'app', message: 'errors.project.not_found' },
        404,
      );
    }

    let respondent: RespondentAggregate | null = null;
    if (dto.uuid) {
      respondent = await this._respondentRepository.getOne([
        { field: 'uuid', value: dto.uuid },
        { field: 'projectId', value: dto.projectId },
      ]);
    }

    if (respondent) {
      return respondent;
    }

    const newRespondent = RespondentAggregate.create(dto);
    return await this._respondentRepository.create(newRespondent.instance);
  }
}
