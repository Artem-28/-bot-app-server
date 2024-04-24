export enum ConfirmCodeTypeEnum {
  REGISTRATION = 'registration',
  UPDATE_PASSWORD = 'update_password',
}

export interface IConfirmCode {
  /** Идентификатор кода */
  id?: number;

  /** Значение кода */
  value: string;

  /** Тип подтверждения кода */
  type: ConfirmCodeTypeEnum;

  /** Адрес отправления кода */
  destination: string;

  /** Срок действия кода */
  liveAt: Date;

  /** Задержка для отправки */
  delayAt: Date;

  /** Дата создания кода */
  createdAt: Date;

  /** Дата обновления кода */
  updatedAt: Date;
}
