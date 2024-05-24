import { validateSync } from 'class-validator';
import { IDialog } from '@/modules/dialog/domain/dialog.interface';

export class DialogCommand {
  plainToInstance(this: IDialog): void {
    validateSync(this, { whitelist: true });
  }
}
