import { validateSync } from 'class-validator';
import { IConfirmCode } from '@/modules/confirm-code/domain/confirm-code.interface';

export class ConfirmCodeCommand {
  plainToInstance(this): void {
    validateSync(this, { whitelist: true });
  }

  update(this, data: Partial<IConfirmCode>): void {
    Object.assign(this, data);
  }

  setLiveTime(this, time: number): void {
    const timestamp = new Date().getTime();
    this.liveAt = new Date(timestamp + time * 1000);
  }

  setDelayTime(this, time: number): void {
    const timestamp = new Date().getTime();
    this.delayAt = new Date(timestamp + time * 1000);
  }

  confirm(this, value: string): void {
    this.confirmed = this.value === value;
  }
}
