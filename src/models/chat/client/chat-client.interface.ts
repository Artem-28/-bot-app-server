import { IBase } from '@/models/base';

export interface IChatClient extends IBase {
  /** Идентификатор чата к которому привязан клиент */
  chatId: number;

  /** Идентификатор сокета */
  socketId: string;

  /** Идентификатор респондента */
  respondentId: number | null;

  /** Идентификатор пользователя */
  userId: number | null;

  /** Последняя активность клиента */
  lastActiveAt: Date;
}
