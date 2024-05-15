import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@/entities/base.entity';
import { UserEntity } from '@/entities/user.entity';
import { ScriptEntity } from '@/entities/script.entity';
import { ProjectRespondentEntity } from '@/entities/project-respondent.entity';

export const PROJECT_TABLE = 'projects';

@Entity({ name: PROJECT_TABLE })
export class ProjectEntity extends BaseEntity {
  @Column({ name: 'user_id' })
  public userId: number;

  @Column()
  public title: string;

  @ManyToOne(() => UserEntity, (user) => user.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;

  @OneToMany(() => ScriptEntity, (script) => script.project)
  public scripts: ScriptEntity[];

  @OneToMany(
    () => ProjectRespondentEntity,
    (projectRespondent) => projectRespondent.project,
  )
  public respondents: ProjectRespondentEntity[];
}
