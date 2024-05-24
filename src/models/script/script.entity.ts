import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DialogEntity } from '@/entities';
import { ProjectEntity } from '@/models/project';
import { BaseEntity } from '@/models/base';

export const SCRIPT_TABLE = 'scripts';

@Entity({ name: SCRIPT_TABLE })
export class ScriptEntity extends BaseEntity {
  @Column({ name: 'project_id' })
  projectId: number;

  @Column()
  title: string;

  @ManyToOne(() => ProjectEntity, (project) => project.scripts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  public project: ProjectEntity;

  @OneToMany(() => DialogEntity, (dialog) => dialog.project)
  public dialogs: DialogEntity[];
}
