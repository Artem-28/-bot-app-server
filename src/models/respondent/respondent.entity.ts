import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DialogEntity } from '@/entities';
import { UUID } from 'crypto';
import { ProjectEntity } from '@/models/project';
import { BaseEntity } from '@/models/base';

export const RESPONDENT_TABLE = 'respondents';

@Entity({ name: RESPONDENT_TABLE })
export class RespondentEntity extends BaseEntity {
  @Column()
  public uuid: UUID;

  @Column({ name: 'project_id' })
  public projectId: number;

  @Column({ nullable: true })
  public name: string | null;

  @Column({ name: 'last_name', nullable: true })
  public lastName: string | null;

  @Column({ nullable: true })
  public surname: string | null;

  @Column({ nullable: true })
  public email: string | null;

  @Column({ nullable: true })
  public phone: string | null;

  @ManyToOne(() => ProjectEntity, (project) => project.respondents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  public project: ProjectEntity;

  @OneToMany(() => DialogEntity, (dialog) => dialog.project)
  public dialogs: DialogEntity[];
}
