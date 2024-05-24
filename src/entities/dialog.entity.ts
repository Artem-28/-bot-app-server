import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity, RespondentEntity, ScriptEntity } from '@/entities';
import { ProjectEntity } from '@/models/project';

export const DIALOG_TABLE = 'dialogs';

@Entity({ name: DIALOG_TABLE })
export class DialogEntity extends BaseEntity {
  @Column({ name: 'project_id' })
  projectId: number;

  @Column({ name: 'script_id' })
  scriptId: number;

  @Column({ name: 'respondent_id' })
  respondentId: number;

  @ManyToOne(() => ProjectEntity, (project) => project.dialogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  public project: ProjectEntity;

  @ManyToOne(() => ScriptEntity, (script) => script.dialogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'script_id' })
  public script: ScriptEntity;

  @ManyToOne(() => RespondentEntity, (respondent) => respondent.dialogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'respondent_id' })
  public respondent: RespondentEntity;
}
