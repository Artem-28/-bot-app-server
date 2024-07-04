import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ChatRepository } from '@/repositories/chat';
import { ScriptRepository } from '@/repositories/script';
import { CommonError } from '@/common/error';
import { RespondentRepository } from '@/repositories/respondent';
import { ChatAggregate, ChatClientAggregate, IChatClient } from '@/models/chat';
import { ConnectClientDto, StartDataDto } from '@/modules/chat/service';
import { JwtService } from '@nestjs/jwt';
import { hGenerateCode } from '@/common/utils';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/repositories/user';

@Injectable()
export class ChatService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _chatRepository: ChatRepository,
    private readonly _scriptRepository: ScriptRepository,
    private readonly _respondentRepository: RespondentRepository,
    private readonly _userRepository: UserRepository,
  ) {}

  public async getStartData(dto: StartDataDto) {
    const script = await this._scriptRepository.getOne({
      field: 'id',
      value: dto.scriptId,
    });
    if (!script) {
      throw new CommonError(
        { field: null, ctx: 'app', message: 'errors.script.not_found' },
        404,
      );
    }

    const respondent = await this._respondentRepository.getOne([
      { field: 'id', value: dto.respondentId },
      { field: 'projectId', value: script.projectId },
    ]);
    if (!respondent) {
      throw new CommonError(
        { field: null, ctx: 'app', message: 'errors.respondent.not_found' },
        404,
      );
    }

    const keyValue = hGenerateCode('******-******-******-******-******-******');
    const key = await bcrypt.hash(keyValue, 10);

    const instance = ChatAggregate.create({
      projectId: script.projectId,
      scriptId: script.id,
      respondentId: respondent.id,
      key,
    }).instance;

    const chat = await this._chatRepository.create(instance);

    return {
      secretKey: keyValue,
      chat,
    };
  }

  public async getToken(chatId: number, key: string) {
    const chat = await this._chatRepository.getOne({
      field: 'id',
      value: chatId,
    });

    const keyMatch = await bcrypt.compare(key, chat.key);
    if (!keyMatch) {
      throw new CommonError({
        field: null,
        ctx: 'app',
        message: 'errors.chat.token',
      });
    }

    return this._jwtService.sign({
      chatId: chat.id,
      respondentId: chat.respondentId,
    });
  }

  public async connectClient(dto: ConnectClientDto) {
    if ('chatId' in dto.token && dto.chatId !== dto.token.chatId) {
      throw new UnauthorizedException();
    }

    const chat = await this._chatRepository.getOne({
      field: 'id',
      value: dto.chatId,
    });

    if (!chat) {
      throw new CommonError({
        field: null,
        ctx: 'app',
        message: 'error.chat.not_found',
      });
    }

    const clientDto: Partial<IChatClient> = {
      chatId: chat.id,
      socketId: dto.socketId,
    };
    if ('respondentId' in dto.token) {
      const respondent = await this._respondentRepository.getOne([
        { field: 'id', value: dto.token.respondentId },
        { field: 'projectId', value: chat.projectId },
      ]);
      clientDto.respondentId = respondent?.id;
    } else {
      const user = await this._userRepository.getOne({
        field: 'id',
        value: dto.token.id,
      });
      clientDto.userId = user?.id;
    }

    if (!clientDto.userId && !clientDto.respondentId) {
      throw new CommonError({
        field: null,
        ctx: 'app',
        message: 'error.chat.client_not_found',
      });
    }

    const client = ChatClientAggregate.create(clientDto);

    return await this._chatRepository.connectClient(client.instance);
  }

  public async disconnectClient(socketId: string) {
    return await this._chatRepository.disconnectClient(socketId);
  }

  public async getClientsByChatId(chatId: number) {
    return await this._chatRepository.getClients({
      field: 'chatId',
      value: chatId,
    });
  }
}
