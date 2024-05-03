export interface IScript {
  /** Идентификатор скрипта */
  id?: number;

  /** Идентификатор проекта к которому привязан скрипт */
  projectId: number;

  /** Название скрипта */
  title: string;

  /** Дата создания скрипта */
  createdAt: Date;

  /** Дата обновления скрипта */
  updatedAt: Date;
}
