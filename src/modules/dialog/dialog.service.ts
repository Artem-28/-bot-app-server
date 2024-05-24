import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { DialogRepository } from '@/repositories/dialog';
import { RespondentService } from '@/modules/respondent/respondent.service';
import { StartDto } from '@/modules/dialog/dto';
import { ScriptRepository } from '@/repositories/script';
import { CommonError } from '@/common/error';
import { DialogAggregate } from '@/modules/dialog/domain';
import { RespondentRepository } from '@/repositories/respondent';

@Injectable()
export class DialogService {
  constructor(
    private readonly _dialogRepository: DialogRepository,
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

    const dialog = await this._dialogRepository.getOne([
      { field: 'projectId', value: dto.projectId },
      { field: 'scriptId', value: dto.scriptId },
      { field: 'respondentId', value: dto.respondentId },
    ]);

    if (dialog) return dialog;

    const newDialog = DialogAggregate.create(dto);
    return await this._dialogRepository.create(newDialog.instance);
  }

  public async start(dto: StartDto) {
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

    let dialog = await this._dialogRepository.getOne([
      { field: 'projectId', value: dialogDto.projectId },
      { field: 'scriptId', value: dialogDto.scriptId },
      { field: 'respondentId', value: dialogDto.respondentId },
    ]);

    if (!dialog) {
      const newDialog = DialogAggregate.create(dialogDto);
      dialog = await this._dialogRepository.create(newDialog.instance);
    }
    return dialog;

    // return this.startServer(dialog);
  }
}
