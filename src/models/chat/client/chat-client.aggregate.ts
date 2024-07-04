import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { DomainError } from '@/common/error';
import { IChat } from '@/models/chat/chat.interface';
import { IChatClient } from '@/models/chat/client/chat-client.interface';

export class ChatClientAggregate implements IChatClient {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsDefined()
  @IsNumber()
  chatId: number;

  @IsDefined()
  @IsString()
  socketId: string;

  @IsOptional()
  userId = null;

  @IsOptional()
  respondentId = null;

  @IsDate()
  lastActiveAt = new Date();

  @IsDate()
  createdAt = new Date();

  @IsDate()
  updatedAt = new Date();

  static create(data: Partial<IChatClient>) {
    const _client = new ChatClientAggregate();
    Object.assign(_client, data);
    _client.updatedAt = data?.id ? new Date() : _client.updatedAt;
    _client.lastActiveAt = data?.id ? new Date() : _client.lastActiveAt;
    const errors = validateSync(_client, { whitelist: true });
    if (!!errors.length) {
      throw new DomainError(errors, { message: 'Client not valid ' });
    }
    return _client;
  }

  get instance(): IChatClient {
    return {
      chatId: this.chatId,
      socketId: this.socketId,
      userId: this.userId,
      respondentId: this.respondentId,
      lastActiveAt: this.lastActiveAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
