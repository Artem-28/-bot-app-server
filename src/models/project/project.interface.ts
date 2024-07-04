import { IBase } from '@/models/base';

export interface IProject extends IBase {
  /** Идентификатор пользователя (владельца проекта) */
  userId: number;

  /** Название проекта */
  title: string;
}
