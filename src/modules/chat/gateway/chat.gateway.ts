import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRepository } from '@/repositories/chat';
import { DataSource } from 'typeorm';
import { ChatService } from '@/modules/chat/service';
import { JwtService } from '@nestjs/jwt';
import { ScriptRepository } from '@/repositories/script';
import { RespondentRepository } from '@/repositories/respondent';
import { CommonError } from '@/common/error';
import { UserRepository } from '@/repositories/user';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
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
    const userRepository = new UserRepository(_dataSource);
    this._chatService = new ChatService(
      _jwtService,
      chatRepository,
      scriptRepository,
      respondentRepository,
      userRepository,
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

      socket.data.client = await this._chatService.connectClient({
        socketId: socket.id,
        chatId: Number(id),
        token,
      });
    } catch (error) {
      console.log(error);
      socket.emit('Error', error);
      return socket.disconnect();
    }
  }

  async handleDisconnect(socket: Socket) {
    const success = await this._chatService.disconnectClient(socket.id);
    if (!success) return;
    socket.disconnect();
    console.log('DISCONNECT ....');
  }

  @SubscribeMessage('sendMessage')
  async onSendMessage(socket: Socket, dto: any) {
    const currentClient = socket.data.client;
    const clients = await this._chatService.getClientsByChatId(
      currentClient.chatId,
    );
    clients.forEach((client) => {
      this.server.to(client.socketId).emit('onMessage', dto);
    });
  }
}
