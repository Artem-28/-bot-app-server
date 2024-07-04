import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProjectEntity } from '@/models/project';
import { ScriptEntity } from '@/models/script';
import { RespondentEntity } from '@/models/respondent';
import { BaseEntity } from '@/models/base';
import { ChatClientEntity } from '@/models/chat';

export const CHAT_TABLE = 'chats';

@Entity({ name: CHAT_TABLE })
export class ChatEntity extends BaseEntity {
  @Column()
  key: string;

  @Column({ name: 'project_id' })
  projectId: number;

  @Column({ name: 'script_id' })
  scriptId: number;

  @Column({ name: 'respondent_id' })
  respondentId: number;

  @ManyToOne(() => ProjectEntity, (project) => project.chats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  public project: ProjectEntity;

  @ManyToOne(() => ScriptEntity, (script) => script.chats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'script_id' })
  public script: ScriptEntity;

  @ManyToOne(() => RespondentEntity, (respondent) => respondent.chats)
  @JoinColumn({ name: 'respondent_id' })
  public respondent: RespondentEntity;

  @OneToMany(() => ChatClientEntity, (chatClient) => chatClient.chat)
  public clients: ChatClientEntity[];
}
