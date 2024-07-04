import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/models/base';
import { ChatEntity, ChatMessageTypeEnum } from '@/models/chat';

export const CHAT_MESSAGE_TABLE = 'chat_messages';

@Entity({ name: CHAT_MESSAGE_TABLE })
export class ChatMessageEntity extends BaseEntity {
  @Column({ name: 'chat_id' })
  chatId: number;

  @Column({
    type: 'enum',
    enum: ChatMessageTypeEnum,
    enumName: 'chat_message_type',
  })
  type: ChatMessageTypeEnum;

  @Column()
  text: string;

  @Column({ name: 'user_id', nullable: true })
  userId: number | null;

  @Column({ name: 'respondent_id', nullable: true })
  respondentId: number | null;

  @ManyToOne(() => ChatEntity, (chat) => chat.clients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chat_id' })
  public chat: ChatEntity;
}
