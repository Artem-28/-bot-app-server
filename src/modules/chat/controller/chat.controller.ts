import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateChatDto } from '@/modules/chat/controller';
import { ChatService } from '@/modules/chat/service';

@Controller('api/v1/projects/:projectId/dialogs')
export class ChatController {
  constructor(private readonly _chatService: ChatService) {}

  @Post('start')
  public async start(@Param() param, @Body() dto: CreateChatDto) {
    return await this._chatService.start(dto);
  }
}
