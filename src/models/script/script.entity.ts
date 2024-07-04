import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProjectEntity } from '@/models/project';
import { BaseEntity } from '@/models/base';
import { ChatEntity } from '@/models/chat';

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

  @OneToMany(() => ChatEntity, (chat) => chat.script)
  public chats: ChatEntity[];
}
