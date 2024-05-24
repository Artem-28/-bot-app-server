export interface IDialog {
  /** Идентификатор диалога */
  id?: number;

  /** Идентификатор проекта к которому привязан диалог */
  projectId: number;

  /** Идентификатор скрипта к которому привязан диалог */
  scriptId: number;

  /** Идентификатор респондента к которому привязан диалог */
  respondentId: number;

  /** Дата создания диалога */
  createdAt: Date;

  /** Дата обновления диалога */
  updatedAt: Date;
}
