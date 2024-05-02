import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/entities/base.entity';
import { UserEntity } from '@/entities/user.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;
}
