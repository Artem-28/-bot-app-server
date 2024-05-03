import { validateSync } from 'class-validator';
import { IScript } from '@/modules/script/domain/script.interface';

export class ScriptCommand {
  plainToInstance(this: IScript): void {
    validateSync(this, { whitelist: true });
  }
}
