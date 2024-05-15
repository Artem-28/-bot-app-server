import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '@/repositories/base.repository';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { RespondentRepositoryDomain } from '@/repositories/respondent/respondent-repository.domain';
import { IRespondent, RespondentAggregate } from '@/modules/respondent/domain';
import { IProject } from '@/modules/project/domain';
import {
  ProjectEntity,
  ProjectRespondentEntity,
  RespondentEntity,
} from '@/entities';
import { FilterDto } from '@/common/dto';
import { HQueryBuilder } from '@/common/utils';

@Injectable()
export class RespondentRepository
  extends BaseRepository
  implements RespondentRepositoryDomain
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  public async addToProject(
    respondent: IRespondent,
    project: IProject,
  ): Promise<RespondentAggregate> {
    const projectRespondent = new ProjectRespondentEntity();
    projectRespondent.respondent = Object.assign(
      new RespondentEntity(),
      respondent,
    );
    projectRespondent.project = Object.assign(new ProjectEntity(), project);
    const result = await this.getRepository(ProjectRespondentEntity).save(
      projectRespondent,
    );
    return RespondentAggregate.create(result);
  }

  public async getOne(
    filter: FilterDto<IRespondent> | FilterDto<IRespondent>[],
  ): Promise<RespondentAggregate | null> {
    const repository = this.getRepository(RespondentEntity);
    const query = new HQueryBuilder(repository, { filter: filter });

    const result = await query.builder.getOne();
    if (!result) return null;
    return RespondentAggregate.create(result);
  }

  public async create(respondent: IRespondent): Promise<RespondentAggregate> {
    const result = await this.getRepository(RespondentEntity).save(respondent);
    return RespondentAggregate.create(result);
  }
}
