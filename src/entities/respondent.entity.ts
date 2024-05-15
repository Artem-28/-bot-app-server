import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@/entities/base.entity';
import { UUID } from 'crypto';
import { ProjectRespondentEntity } from '@/entities/project-respondent.entity';

export const RESPONDENT_TABLE = 'respondents';

@Entity({ name: RESPONDENT_TABLE })
export class RespondentEntity extends BaseEntity {
  @Column({ unique: true })
  public uuid: UUID;

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

  @OneToMany(
    () => ProjectRespondentEntity,
    (projectRespondent) => projectRespondent.respondent,
  )
  public projects: ProjectRespondentEntity[];
}
