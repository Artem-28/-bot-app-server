import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '@/models/base';
import { ProjectEntity } from '@/models/project/project.entity';

export const USER_TABLE = 'users';

@Entity({ name: USER_TABLE })
export class UserEntity extends BaseEntity {
  @Column()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ nullable: true })
  public phone: string;

  @Column({ name: 'license_agreement' })
  public licenseAgreement: boolean;

  @Column({ name: 'email_verified_at', nullable: true })
  public emailVerifiedAt: Date;

  @Column({ name: 'phone_verified_at', nullable: true })
  public phoneVerifiedAt: Date;

  @Column({ name: 'last_active_at', nullable: true })
  public lastActiveAt: Date;

  @OneToMany(() => ProjectEntity, (project) => project.user)
  public projects: ProjectEntity[];
}
