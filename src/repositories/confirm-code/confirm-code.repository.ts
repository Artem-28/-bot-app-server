import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseRepository } from '@/common/base';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { ConfirmCodeEntity } from '@/entities';
import { ConfirmCodeRepositoryDomain } from '@/repositories/confirm-code';
import {
  ConfirmCodeAggregate,
  IConfirmCode,
} from '@/modules/confirm-code/domain';

@Injectable({ scope: Scope.REQUEST })
export class ConfirmCodeRepository
  extends BaseRepository
  implements ConfirmCodeRepositoryDomain
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  public async create(confirmCode: IConfirmCode) {
    const result = await this.getRepository(ConfirmCodeEntity).create(confirmCode);
    return ConfirmCodeAggregate.create(result);
  }
}
