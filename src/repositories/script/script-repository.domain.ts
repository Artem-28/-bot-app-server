import { FilterDto } from '@/common/dto';
import { IScript, ScriptAggregate } from '@/models/script';

export abstract class ScriptRepositoryDomain {
  abstract create(script: IScript): Promise<ScriptAggregate>;
  abstract update(
    id: number,
    data: Partial<Pick<IScript, 'title'>>,
  ): Promise<boolean>;

  abstract getOne(
    filter: FilterDto<IScript> | FilterDto<IScript>[],
  ): Promise<ScriptAggregate | null>;

  abstract getMany(
    filter: FilterDto<IScript> | FilterDto<IScript>[],
  ): Promise<ScriptAggregate[]>;

  abstract remove(id: number): Promise<boolean>;
}
