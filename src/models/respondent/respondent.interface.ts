import { UUID } from 'crypto';
import { IBase } from '@/models/base';

export interface IRespondent extends IBase {
  /** Идентификатор респондента */
  uuid: UUID;

  /** Идентификатор проекта к которому пренадлежит респондент */
  projectId: number;

  /** Имя респондента */
  name: string | null;

  /** Фамилия респондента */
  lastName: string | null;

  /** Отчество респондента */
  surname: string | null;

  /** Email респондента */
  email: string | null;

  /** Телефон респондента */
  phone: string | null;
}
