import { Body, Controller, Param, Post } from '@nestjs/common';
import { GetTokenDto, StartDataDto } from '@/modules/chat/controller';
import { ChatService } from '@/modules/chat/service';

@Controller('api/v1/projects/:projectId/chats')
export class ChatController {
  constructor(private readonly _chatService: ChatService) {}

  @Post('start_data')
  public async startData(@Param() param, @Body() dto: StartDataDto) {
    return await this._chatService.getStartData(dto);
  }

  @Post(':chatId/token')
  public async getToken(@Param() param, @Body() dto: GetTokenDto) {
    return await this._chatService.getToken(
      Number(param.chatId),
      dto.secretKey,
    );
  }
}
