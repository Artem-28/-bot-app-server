import { IRespondent, RespondentAggregate } from '@/modules/respondent/domain';
import { IProject } from '@/modules/project/domain';
import { FilterDto } from '@/common/dto';

export abstract class RespondentRepositoryDomain {
  abstract addToProject(
    respondent: IRespondent,
    project: IProject,
  ): Promise<RespondentAggregate>;

  abstract create(respondent: IRespondent): Promise<RespondentAggregate>;

  abstract getOne(
    filter: FilterDto<IRespondent> | FilterDto<IRespondent>[],
  ): Promise<RespondentAggregate | null>;
}
