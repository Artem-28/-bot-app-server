import { FilterDto } from '@/common/dto';
import {
  ChatAggregate,
  ChatClientAggregate,
  IChat,
  IChatClient,
} from '@/models/chat';

export abstract class ChatRepositoryDomain {
  abstract create(dialog: IChat): Promise<ChatAggregate>;

  abstract getOne(
    filter: FilterDto<IChat> | FilterDto<IChat>[],
  ): Promise<ChatAggregate | null>;

  abstract joinClient(client: IChatClient): Promise<ChatClientAggregate>;
}
