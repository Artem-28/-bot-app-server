import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '@/models/base';
import { ProjectEntity } from '@/entities/project.entity';

export const USER_TABLE = 'users';

@Entity({ name: USER_TABLE })
export class UserEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ name: 'license_agreement' })
  licenseAgreement: boolean;

  @Column({ name: 'email_verified_at', nullable: true })
  emailVerifiedAt: Date;

  @Column({ name: 'phone_verified_at', nullable: true })
  phoneVerifiedAt: Date;

  @Column({ name: 'last_active_at', nullable: true })
  lastActiveAt: Date;

  @OneToMany(() => ProjectEntity, (project) => project.user)
  projects: ProjectEntity[];
}
