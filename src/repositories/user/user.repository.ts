import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseRepository } from '@/repositories/base.repository';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { UserEntity } from '@/entities';
import { UserRepositoryDomain } from '@/repositories/user';
import { IUser, UserAggregate } from '@/modules/user/domain';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository
  extends BaseRepository
  implements UserRepositoryDomain
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  public async create(user: IUser) {
    const result = await this.getRepository(UserEntity).create(user);
    return UserAggregate.create(result);
  }
}
