import { validateSync } from 'class-validator';
import { IUser } from '@/modules/user/domain/index';

export class UserCommand {
  plainToInstance(this: IUser): void {
    validateSync(this, { whitelist: true });
  }

  verifyEmail(this: IUser) {
    this.emailVerifiedAt = new Date();
  }
}
