import {
  ConfirmCodeAggregate,
  IConfirmCode,
} from '@/modules/confirm-code/domain';
import { FilterDto } from '@/common/dto';

export abstract class ConfirmCodeRepositoryDomain {
  abstract create(code: IConfirmCode): Promise<ConfirmCodeAggregate>;
  abstract update(id: number, data: Partial<IConfirmCode>): Promise<boolean>;
  abstract getOne(
    filter: FilterDto<IConfirmCode> | FilterDto<IConfirmCode>[],
  ): Promise<ConfirmCodeAggregate | null>;
  abstract remove(id: number): Promise<boolean>;
}
