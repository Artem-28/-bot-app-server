import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/entities/base.entity';
import {
  ConfirmCodeTypeEnum,
  IConfirmCode,
} from '@/modules/confirm-code/domain';

export const CONFIRM_CODE_TABLE = 'confirm_codes';

@Entity({ name: CONFIRM_CODE_TABLE })
export class ConfirmCodeEntity extends BaseEntity implements IConfirmCode {
  @Column()
  value: string;

  @Column({ type: 'enum', enum: ConfirmCodeTypeEnum })
  type: ConfirmCodeTypeEnum;

  @Column()
  destination: string;

  @Column({ name: 'live_at' })
  liveAt: Date;

  @Column({ name: 'delay_at' })
  delayAt: Date;
}
