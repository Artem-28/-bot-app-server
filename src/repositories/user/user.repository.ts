import { BaseRepository } from '@/common/base';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { UserRepositoryDomain } from '@/repositories/user/user-repository.domain';
import { IUser } from '@/modules/auth/domain';
import { UserEntity } from '@/entities/user.entity';
import { UserAggregate } from '@/modules/auth/domain/user.aggregate';

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
