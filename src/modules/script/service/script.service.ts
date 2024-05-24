import { Injectable } from '@nestjs/common';
import { ScriptRepository } from '@/repositories/script';
import {
  CreateScriptDto,
  GetScriptDto,
  UpdateScriptDto,
} from '@/modules/script/service';
import { ScriptAggregate } from '@/models/script';
import { CommonError } from '@/common/error';

@Injectable()
export class ScriptService {
  constructor(private readonly _scriptRepository: ScriptRepository) {}

  public async create(dto: CreateScriptDto): Promise<ScriptAggregate> {
    const script = ScriptAggregate.create(dto);
    return await this._scriptRepository.create(script.instance);
  }

  public async update(dto: UpdateScriptDto): Promise<ScriptAggregate> {
    const script = await this._scriptRepository.getOne([
      { field: 'id', value: dto.id },
      { field: 'projectId', value: dto.projectId },
    ]);

    if (!script) {
      throw new CommonError(
        { field: null, ctx: 'app', message: 'errors.script.not_found' },
        404,
      );
    }

    const success = await this._scriptRepository.update(dto.id, {
      title: dto.title,
    });

    if (!success) {
      throw new CommonError({
        field: null,
        ctx: 'app',
        message: 'errors.script.update',
      });
    }

    return ScriptAggregate.create({ ...script.instance, ...dto });
  }

  public async remove(dto: GetScriptDto): Promise<boolean> {
    const script = await this._scriptRepository.getOne([
      { field: 'id', value: dto.id },
      { field: 'projectId', value: dto.projectId },
    ]);

    if (!script) {
      throw new CommonError(
        { field: null, ctx: 'app', message: 'errors.script.not_found' },
        404,
      );
    }

    return await this._scriptRepository.remove(dto.id);
  }

  public async info(dto: GetScriptDto): Promise<ScriptAggregate> {
    const script = await this._scriptRepository.getOne([
      { field: 'id', value: dto.id },
      { field: 'projectId', value: dto.projectId },
    ]);

    if (!script) {
      throw new CommonError(
        { field: null, ctx: 'app', message: 'errors.script.not_found' },
        404,
      );
    }

    return script;
  }

  public async getProjectScripts(
    projectId: number,
  ): Promise<ScriptAggregate[]> {
    return await this._scriptRepository.getMany({
      field: 'projectId',
      value: projectId,
    });
  }
}
