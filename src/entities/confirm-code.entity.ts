import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/common/base';
import { ConfirmCodeTypeEnum } from '@/modules/confirm-code/domain';

@Entity({ name: 'confirm_codes' })
export class ConfirmCodeEntity extends BaseEntity {
  @Column()
  value: string;

  @Column({ type: 'enum', enum: ConfirmCodeTypeEnum })
  type: ConfirmCodeTypeEnum;

  @Column()
  destination: string;

  @Column({ name: 'expiration_date' })
  expirationDate: Date;
}
