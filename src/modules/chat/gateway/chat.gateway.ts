import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRepository } from '@/repositories/chat';
import { DataSource } from 'typeorm';
import { ChatService } from '@/modules/chat/service';
import { JwtService } from '@nestjs/jwt';
import { ScriptRepository } from '@/repositories/script';
import { RespondentRepository } from '@/repositories/respondent';
import { UnauthorizedException } from '@nestjs/common';
import { CommonError } from '@/common/error';
import {RespondentToken} from "@/common/types";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private readonly _chatService: ChatService;

  constructor(
    private readonly _dataSource: DataSource,
    private readonly _jwtService: JwtService,
  ) {
    const chatRepository = new ChatRepository(_dataSource);
    const scriptRepository = new ScriptRepository(_dataSource);
    const respondentRepository = new RespondentRepository(_dataSource);
    this._chatService = new ChatService(
      _jwtService,
      chatRepository,
      scriptRepository,
      respondentRepository,
    );
  }

  private _validateHeaders(socket: Socket) {
    const { authorization, id } = socket.handshake.headers;
    if (authorization && Number(id)) return true;
    throw new CommonError({
      field: null,
      ctx: 'app',
      message: 'error.required.headers_field',
    });
  }

  async handleConnection(socket: Socket) {
    try {
      this._validateHeaders(socket);
      const { authorization, id } = socket.handshake.headers;
      const token = await this._jwtService.verifyAsync(authorization);

      const isRespondent = 'respondentId' in token;
      const chatId = Number(id);
      if (isRespondent) {
        await this._chatService.connectRespondent({
          socketId: socket.id,
          chatId,
          token,
        });
      }
    } catch (error) {
      console.log(error);
      socket.emit('Error', error);
      return socket.disconnect();
    }
    // console.log('connected...', this._chatService);
  }
}
