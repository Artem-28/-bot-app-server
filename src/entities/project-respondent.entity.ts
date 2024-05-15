import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity, ProjectEntity, RespondentEntity } from '@/entities';

export const PROJECT_RESPONDENT_TABLE = 'project_respondents';

@Entity({ name: PROJECT_RESPONDENT_TABLE })
@Unique(['project', 'respondent'])
export class ProjectRespondentEntity extends BaseEntity {
  @Column({ name: 'project_id' })
  public projectId: number;

  @Column({ name: 'respondent_id' })
  public respondentId: number;

  @ManyToOne(() => ProjectEntity, (project) => project.respondents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  public project: ProjectEntity;

  @ManyToOne(() => RespondentEntity, (respondent) => respondent.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'respondent_id' })
  public respondent: RespondentEntity;
}
