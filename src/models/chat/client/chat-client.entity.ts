import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/models/base';
import { ChatEntity } from '@/models/chat';

export const CHAT_CLIENT_TABLE = 'chat_clients';

@Entity({ name: CHAT_CLIENT_TABLE })
export class ChatClientEntity extends BaseEntity {
  @Column({ name: 'chat_id' })
  chatId: number;

  @Column({ name: 'socket_id' })
  socketId: string;

  @Column({ name: 'user_id', nullable: true })
  userId: number | null;

  @Column({ name: 'respondent_id', nullable: true })
  respondentId: number | null;

  @Column({ name: 'last_active_at' })
  lastActiveAt: Date;

  @ManyToOne(() => ChatEntity, (chat) => chat.clients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chat_id' })
  public chat: ChatEntity;
}
