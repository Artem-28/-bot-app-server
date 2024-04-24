import { Inject, Injectable, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { ConfirmCodeEntity } from '@/entities';
import { ConfirmCodeRepositoryDomain } from '@/repositories/confirm-code';
import { BaseRepository } from '@/repositories/base.repository';
import {
  ConfirmCodeAggregate,
  IConfirmCode,
} from '@/modules/confirm-code/domain';
import { FilterDto } from '@/repositories/confirm-code/dto';
import { HQueryBuilder } from '@/common/utils';

@Injectable({ scope: Scope.REQUEST })
export class ConfirmCodeRepository
  extends BaseRepository
  implements ConfirmCodeRepositoryDomain
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  public async create(
    confirmCode: IConfirmCode,
  ): Promise<ConfirmCodeAggregate> {
    const result =
      await this.getRepository(ConfirmCodeEntity).save(confirmCode);
    return ConfirmCodeAggregate.create(result);
  }

  public async update(
    id: number,
    data: Partial<IConfirmCode>,
  ): Promise<boolean> {
    const result = await this.getRepository(ConfirmCodeEntity)
      .createQueryBuilder()
      .update()
      .set(data)
      .where({ id })
      .execute();
    return !!result.affected;
  }

  public async getOne(
    filter: FilterDto | FilterDto[],
  ): Promise<ConfirmCodeAggregate | null> {
    const repository = this.getRepository(ConfirmCodeEntity);
    const query = new HQueryBuilder(repository, { filter: filter });

    const result = await query.builder.getOne();
    if (!result) return null;
    return ConfirmCodeAggregate.create(result);
  }

  public async remove(id: number): Promise<boolean> {
    const result = await this.getRepository(ConfirmCodeEntity)
      .createQueryBuilder()
      .delete()
      .where({ id })
      .execute();
    return !!result.affected;
  }
}
