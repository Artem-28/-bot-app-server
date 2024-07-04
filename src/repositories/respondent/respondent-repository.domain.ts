import { FilterDto } from '@/common/dto';
import { IRespondent, RespondentAggregate } from '@/models/respondent';

export abstract class RespondentRepositoryDomain {
  abstract create(respondent: IRespondent): Promise<RespondentAggregate>;

  abstract getOne(
    filter: FilterDto<IRespondent> | FilterDto<IRespondent>[],
  ): Promise<RespondentAggregate | null>;
}
