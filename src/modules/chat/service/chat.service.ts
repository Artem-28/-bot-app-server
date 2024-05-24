import { Injectable } from '@nestjs/common';
import { ChatRepository } from '@/repositories/chat';
import { RespondentService } from '@/modules/respondent/service/respondent.service';
import { ScriptRepository } from '@/repositories/script';
import { CommonError } from '@/common/error';
import { RespondentRepository } from '@/repositories/respondent';
import { ChatAggregate } from '@/models/chat';
import { CreateChatDto } from '@/modules/chat/service';

@Injectable()
export class ChatService {
  constructor(
    private readonly _chatRepository: ChatRepository,
    private readonly _respondentRepository: RespondentRepository,
    private readonly _scriptRepository: ScriptRepository,
    private readonly _respondentService: RespondentService,
  ) {}

  public async getConnectionDialog(scriptId: number, respondentId: number) {
    const script = await this._scriptRepository.getOne({
      field: 'id',
      value: scriptId,
    });
    if (!script) {
      throw new CommonError(
        { field: null, ctx: 'app', message: 'errors.script.not_found' },
        404,
      );
    }

    let respondent = await this._respondentRepository.getOne({
      field: 'id',
      value: respondentId,
    });
    if (!respondent) {
      throw new CommonError(
        { field: null, ctx: 'app', message: 'errors.respondent.not_found' },
        404,
      );
    }

    if (respondent.projectId !== script.projectId) {
      respondent = await this._respondentRepository.create({
        ...respondent.instance,
        projectId: script.projectId,
      });
    }

    const dto = {
      projectId: script.projectId,
      scriptId: script.id,
      respondentId: respondent.id,
    };

    const dialog = await this._chatRepository.getOne([
      { field: 'projectId', value: dto.projectId },
      { field: 'scriptId', value: dto.scriptId },
      { field: 'respondentId', value: dto.respondentId },
    ]);

    if (dialog) return dialog;

    const newDialog = ChatAggregate.create(dto);
    return await this._chatRepository.create(newDialog.instance);
  }

  public async start(dto: CreateChatDto) {
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
    const respondent = await this._respondentService.create({
      projectId: script.projectId,
      ...dto.respondent,
    });

    const dialogDto = {
      projectId: script.projectId,
      scriptId: script.id,
      respondentId: respondent.id,
    };

    let dialog = await this._chatRepository.getOne([
      { field: 'projectId', value: dialogDto.projectId },
      { field: 'scriptId', value: dialogDto.scriptId },
      { field: 'respondentId', value: dialogDto.respondentId },
    ]);

    if (!dialog) {
      const newDialog = ChatAggregate.create(dialogDto);
      dialog = await this._chatRepository.create(newDialog.instance);
    }
    return dialog;
  }
}
