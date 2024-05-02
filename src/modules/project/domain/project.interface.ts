export interface IProject {
  /** Идентификатор проекта */
  id?: number;

  /** Идентификатор пользователя (владельца проекта) */
  userId: number;

  /** Название проекта */
  title: string;

  /** Дата создания проекта */
  createdAt: Date;

  /** Дата обновления проекта */
  updatedAt: Date;
}
