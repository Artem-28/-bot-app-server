import { BaseRepository } from '@/common';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  public create() {
    console.log('create user');
  }
}
