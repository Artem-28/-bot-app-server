import { validateSync } from 'class-validator';
import { IUser } from '@/modules/user/domain';

export interface PlainToInstance {
  plainToInstance(this: IUser): void;
}

export const PLAIN_TO_INSTANCE = async function (this: IUser) {
  validateSync(this, { whitelist: true });
};
