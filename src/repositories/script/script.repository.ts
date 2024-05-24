import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '@/repositories/base.repository';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { FilterDto } from '@/common/dto';
import { HQueryBuilder } from '@/common/utils';
import { ScriptRepositoryDomain } from '@/repositories/script/script-repository.domain';
import { IScript, ScriptAggregate, ScriptEntity } from '@/models/script';

@Injectable()
export class ScriptRepository
  extends BaseRepository
  implements ScriptRepositoryDomain
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  async create(script: IScript): Promise<ScriptAggregate> {
    const result = await this.getRepository(ScriptEntity).save(script);
    return ScriptAggregate.create(result);
  }

  async getOne(
    filter: FilterDto<IScript> | FilterDto<IScript>[],
  ): Promise<ScriptAggregate | null> {
    const repository = this.getRepository(ScriptEntity);
    const query = new HQueryBuilder(repository, { filter: filter });

    const result = await query.builder.getOne();
    if (!result) return null;
    return ScriptAggregate.create(result);
  }

  async update(
    id: number,
    data: Partial<Pick<IScript, 'title'>>,
  ): Promise<boolean> {
    const result = await this.getRepository(ScriptEntity)
      .createQueryBuilder()
      .update()
      .set(data)
      .where({ id })
      .execute();
    return !!result.affected;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.getRepository(ScriptEntity)
      .createQueryBuilder()
      .delete()
      .where({ id })
      .execute();

    return !!result.affected;
  }

  async getMany(
    filter: FilterDto<IScript> | FilterDto<IScript>[],
  ): Promise<ScriptAggregate[]> {
    const repository = this.getRepository(ScriptEntity);
    const query = new HQueryBuilder(repository, { filter: filter });

    const result = await query.builder.getMany();
    if (!result) return null;
    return result.map((item) => ScriptAggregate.create(item));
  }
}
