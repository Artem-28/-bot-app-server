import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '@/repositories/base.repository';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { DialogRepositoryDomain } from '@/repositories/dialog/dialog-repository.domain';
import { DialogAggregate, IDialog } from '@/modules/dialog/domain';
import { DialogEntity } from '@/entities';
import { FilterDto } from '@/common/dto';
import { HQueryBuilder } from '@/common/utils';

@Injectable()
export class DialogRepository
  extends BaseRepository
  implements DialogRepositoryDomain
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  public async create(data: IDialog): Promise<DialogAggregate> {
    const result = await this.getRepository(DialogEntity).save(data);
    return DialogAggregate.create(result);
  }

  public async getOne(
    filter: FilterDto<IDialog> | FilterDto<IDialog>[],
  ): Promise<DialogAggregate | null> {
    const repository = this.getRepository(DialogEntity);
    const query = new HQueryBuilder(repository, { filter });

    const result = await query.builder.getOne();
    if (!result) return null;
    return DialogAggregate.create(result);
  }
}
