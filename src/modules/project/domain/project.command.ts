import { validateSync } from 'class-validator';
import { IProject } from '@/modules/project/domain/project.interface';

export class ProjectCommand {
  plainToInstance(this: IProject): void {
    validateSync(this, { whitelist: true });
  }
}
