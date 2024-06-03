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
import { Exclude } from 'class-transformer';

export class ChatAggregate implements IChat {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @IsDefined()
  @Exclude()
  key: string;

  @IsDefined()
  @IsNumber()
  projectId: number;

  @IsDefined()
  @IsNumber()
  scriptId: number;

  @IsDefined()
  @IsNumber()
  respondentId: number;

  @IsDate()
  createdAt = new Date();

  @IsDate()
  updatedAt = new Date();

  static create(data: Partial<IChat>) {
    const _chat = new ChatAggregate();
    Object.assign(_chat, data);
    _chat.updatedAt = data?.id ? new Date() : _chat.updatedAt;
    const errors = validateSync(_chat, { whitelist: true });
    if (!!errors.length) {
      throw new DomainError(errors, { message: 'Dialog not valid ' });
    }
    return _chat;
  }

  get instance(): IChat {
    return {
      key: this.key,
      projectId: this.projectId,
      scriptId: this.scriptId,
      respondentId: this.respondentId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
