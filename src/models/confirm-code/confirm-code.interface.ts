import { IBase } from '@/models/base';

export enum ConfirmCodeTypeEnum {
  REGISTRATION = 'registration',
  UPDATE_PASSWORD = 'update_password',
}

export type TValidateCodeField = 'confirmed' | 'delay' | 'live';

export interface IConfirmCode extends IBase {
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
}
