import { FilterDto } from '@/common/dto';
import { DialogAggregate, IDialog } from '@/modules/dialog/domain';

export abstract class DialogRepositoryDomain {
  abstract create(dialog: IDialog): Promise<DialogAggregate>;

  abstract getOne(
    filter: FilterDto<IDialog> | FilterDto<IDialog>[],
  ): Promise<DialogAggregate | null>;
}
