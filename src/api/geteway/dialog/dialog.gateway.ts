import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DialogService } from '@/modules/dialog/dialog.service';

@WebSocketGateway({
  path: '/dialogs',
})
export class DialogGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private _dialogService: DialogService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send')
  sendRespondentMessage(@MessageBody() body: any) {
    console.log(this._dialogService);
    console.log('MESSAGE', body);
  }

  @SubscribeMessage('send2')
  disconnectClient(@MessageBody() data: any, client: Socket) {
    console.log('DISCONNECT', client);
    // Получаем идентификатор сокета клиента
    const socketId = client.id;
    console.log(socketId);

    // Отключаем клиента
    this.server.sockets.sockets.get(socketId).disconnect();
  }

  async handleConnection(client: Socket) {
    // const { scriptId, respondentId } = client.handshake.query;
    // const dialog = await this._dialogService.getConnectionDialog(
    //   Number(scriptId),
    //   Number(respondentId),
    // );
    console.log('dialog connected ...', this._dialogService);
  }

  handleDisconnect(client: any): any {
    console.log('disconnect');
  }
}
