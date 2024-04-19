import { validateSync } from 'class-validator';
import { IConfirmCode } from '@/modules/confirm-code/domain';

export interface PlainToInstance {
  plainToInstance(this: IConfirmCode): void;
}

export const PLAIN_TO_INSTANCE = async function (this: IConfirmCode) {
  validateSync(this, { whitelist: true });
};
