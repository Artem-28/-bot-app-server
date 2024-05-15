import { validateSync } from 'class-validator';
import { IRespondent } from '@/modules/respondent/domain';

export class RespondentCommand {
  plainToInstance(this: IRespondent): void {
    validateSync(this, { whitelist: true });
  }
}
