import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/entities/base.entity';
import { ProjectEntity } from '@/entities/project.entity';

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
}
