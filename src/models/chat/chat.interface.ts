import { IBase } from '@/models/base';

export interface IChat extends IBase {
  /** Ключ для подключения к чату респондента */
  key: string;
  /** Идентификатор проекта к которому привязан диалог */
  projectId: number;

  /** Идентификатор скрипта к которому привязан диалог */
  scriptId: number;

  /** Идентификатор респондента к которому привязан диалог */
  respondentId: number;
}
