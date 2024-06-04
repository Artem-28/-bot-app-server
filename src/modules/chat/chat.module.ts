import { Module } from '@nestjs/common';
import { ChatRepository } from '@/repositories/chat';
import { RespondentService } from '@/modules/respondent/service/respondent.service';
import { RespondentRepository } from '@/repositories/respondent';
import { ProjectRepository } from '@/repositories/project';
import { ScriptRepository } from '@/repositories/script';
import { ChatService } from '@/modules/chat/service';
import { ChatController } from '@/modules/chat/controller';
import { ChatGateway } from '@/modules/chat/gateway/chat.gateway';
import { UserRepository } from '@/repositories/user';

@Module({
  providers: [
    ChatService,
    RespondentService,
    ChatRepository,
    RespondentRepository,
    ProjectRepository,
    ScriptRepository,
    UserRepository,
    ChatGateway,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
