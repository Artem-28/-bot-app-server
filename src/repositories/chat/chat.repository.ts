import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '@/repositories/base.repository';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { FilterDto } from '@/common/dto';
import { HQueryBuilder } from '@/common/utils';
import { ChatRepositoryDomain } from '@/repositories/chat';
import { ChatAggregate, ChatEntity, IChat } from '@/models/chat';

@Injectable()
export class ChatRepository
  extends BaseRepository
  implements ChatRepositoryDomain
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request: Request) {
    super(dataSource, request);
  }

  public async create(data: IChat): Promise<ChatAggregate> {
    const result = await this.getRepository(ChatEntity).save(data);
    return ChatAggregate.create(result);
  }

  public async getOne(
    filter: FilterDto<IChat> | FilterDto<IChat>[],
  ): Promise<ChatAggregate | null> {
    const repository = this.getRepository(ChatEntity);
    const query = new HQueryBuilder(repository, { filter });

    const result = await query.builder.getOne();
    if (!result) return null;
    return ChatAggregate.create(result);
  }
}
