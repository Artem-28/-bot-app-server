import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '@/repositories/base.repository';
import { DataSource } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { FilterDto } from '@/common/dto';
import { HQueryBuilder } from '@/common/utils';
import { ChatRepositoryDomain } from '@/repositories/chat';
import {
  ChatAggregate,
  ChatClientAggregate,
  ChatClientEntity,
  ChatEntity,
  IChat,
  IChatClient,
} from '@/models/chat';

@Injectable()
export class ChatRepository
  extends BaseRepository
  implements ChatRepositoryDomain
{
  constructor(dataSource: DataSource, @Inject(REQUEST) request?: Request) {
    super(dataSource, request);
  }

  public async create(chat: IChat): Promise<ChatAggregate> {
    const result = await this.getRepository(ChatEntity).save(chat);
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

  public async connectClient(
    client: IChatClient,
  ): Promise<ChatClientAggregate> {
    const result = await this.getRepository(ChatClientEntity).save(client);
    return ChatClientAggregate.create(result);
  }

  public async disconnectClient(socketId: string): Promise<boolean> {
    const result = await this.getRepository(ChatClientEntity)
      .createQueryBuilder()
      .delete()
      .where({ socketId })
      .execute();

    return !!result.affected;
  }

  public async getClients(
    filter: FilterDto<IChatClient> | FilterDto<IChatClient>[],
  ): Promise<ChatClientAggregate[]> {
    const repository = this.getRepository(ChatClientEntity);
    const query = new HQueryBuilder(repository, { filter: filter });

    const result = await query.builder.getMany();
    if (!result) return null;
    return result.map((item) => ChatClientAggregate.create(item));
  }
}
