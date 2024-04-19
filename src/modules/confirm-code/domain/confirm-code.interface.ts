export enum ConfirmCodeTypeEnum {
  REGISTRATION = 'registration',
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
  expirationDate: Date;

  /** Дата создания кода */
  createdAt: Date;

  /** Дата обновления кода */
  updatedAt: Date;
}
