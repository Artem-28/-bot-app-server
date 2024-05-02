import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseRepository } from '@/repositories/base.repository';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { UserEntity } from '@/entities';
import { UserRepositoryDomain } from '@/repositories/user';
import { IUser, UserAggregate } from '@/modules/user/domain';
import { FilterDto } from '@/common/dto';
import { HQueryBuilder } from '@/common/utils';

@Injectable()
export class UserRepository
  extends BaseRepository
  implements UserRepositoryDomain
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  public async create(user: IUser) {
    const result = await this.getRepository(UserEntity).save(user);
    return UserAggregate.create(result);
  }

  public async getOne(
    filter: FilterDto<IUser> | FilterDto<IUser>[],
  ): Promise<UserAggregate | null> {
    const repository = this.getRepository(UserEntity);
    const query = new HQueryBuilder(repository, { filter: filter });

    const result = await query.builder.getOne();
    if (!result) return null;
    return UserAggregate.create(result);
  }

  public async update(id: number, data: Partial<IUser>): Promise<boolean> {
    const result = await this.getRepository(UserEntity)
      .createQueryBuilder()
      .update()
      .set(data)
      .where({ id })
      .execute();
    return !!result.affected;
  }
}
