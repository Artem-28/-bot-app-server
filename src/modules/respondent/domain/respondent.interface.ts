import { UUID } from 'crypto';

export interface IRespondent {
  /** Идентификатор респондента */
  uuid: UUID;

  /** Идентификатор респондента */
  id?: number;

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

  /** Дата создания респондента */
  createdAt: Date;

  /** Дата обновления респондента */
  updatedAt: Date;
}
