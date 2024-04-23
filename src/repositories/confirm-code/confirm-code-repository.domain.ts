import {
  ConfirmCodeAggregate,
  IConfirmCode,
} from '@/modules/confirm-code/domain';
import { FilterDto } from '@/repositories/confirm-code/dto';

export abstract class ConfirmCodeRepositoryDomain {
  abstract create(code: IConfirmCode): Promise<ConfirmCodeAggregate>;
  abstract update(id: number, data: Partial<IConfirmCode>): Promise<boolean>;
  abstract getOne(
    filter: FilterDto | FilterDto[],
  ): Promise<ConfirmCodeAggregate | null>;
}
