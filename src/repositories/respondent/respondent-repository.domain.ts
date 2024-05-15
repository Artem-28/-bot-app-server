import { IRespondent, RespondentAggregate } from '@/modules/respondent/domain';
import { FilterDto } from '@/common/dto';

export abstract class RespondentRepositoryDomain {
  abstract create(respondent: IRespondent): Promise<RespondentAggregate>;

  abstract getOne(
    filter: FilterDto<IRespondent> | FilterDto<IRespondent>[],
  ): Promise<RespondentAggregate | null>;
}
