import { FilterDto } from '@/common/dto';
import {
  ChatAggregate,
  ChatClientAggregate,
  IChat,
  IChatClient,
} from '@/models/chat';

export abstract class ChatRepositoryDomain {
  abstract create(chat: IChat): Promise<ChatAggregate>;

  abstract getOne(
    filter: FilterDto<IChat> | FilterDto<IChat>[],
  ): Promise<ChatAggregate | null>;

  abstract connectClient(client: IChatClient): Promise<ChatClientAggregate>;
  abstract disconnectClient(socketId: string): Promise<boolean>;
  abstract getClients(
    filter: FilterDto<IChatClient> | FilterDto<IChatClient>[],
  ): Promise<ChatClientAggregate[]>;
}
