import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, RespondentEntity, DialogEntity } from '@/entities';
import { UserEntity } from '@/models/user';
import { ScriptEntity } from '@/models/script';

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

  @OneToMany(() => RespondentEntity, (respondent) => respondent.project)
  public respondents: RespondentEntity[];

  @OneToMany(() => DialogEntity, (dialog) => dialog.project)
  public dialogs: DialogEntity[];
}
