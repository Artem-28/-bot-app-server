import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '@/providers/jwt';
import { ScriptService } from '@/modules/script/script.service';
import {
  Permission,
  PermissionGuard,
  SCRIPT_CREATE,
  SCRIPT_REMOVE,
  SCRIPT_UPDATE,
  SCRIPT_VIEW,
} from '@/providers/permission';
import { CreateScriptDto, UpdateScriptDto } from '@/api/v1/script/dto';

@Controller('api/v1/projects/:projectId/scripts')
@UseGuards(PermissionGuard)
@UseGuards(JwtGuard)
export class ScriptController {
  constructor(private readonly _scriptService: ScriptService) {}

  @Post()
  @Permission(SCRIPT_CREATE)
  public async create(@Param() param, @Body() dto: CreateScriptDto) {
    return await this._scriptService.create({
      projectId: Number(param.projectId),
      ...dto,
    });
  }

  @Get()
  @Permission(SCRIPT_VIEW)
  public async list(@Param() param) {
    return await this._scriptService.getProjectScripts(Number(param.projectId));
  }

  @Get(':scriptId')
  @Permission(SCRIPT_VIEW)
  public async info(@Param() { projectId, scriptId }) {
    return await this._scriptService.info({
      id: Number(scriptId),
      projectId: Number(projectId),
    });
  }

  @Patch(':scriptId')
  @Permission(SCRIPT_UPDATE)
  public async update(
    @Param() { projectId, scriptId },
    @Body() dto: UpdateScriptDto,
  ) {
    return await this._scriptService.update({
      ...dto,
      id: Number(scriptId),
      projectId: Number(projectId),
    });
  }

  @Delete(':scriptId')
  @Permission(SCRIPT_REMOVE)
  public async remove(@Param() { projectId, scriptId }) {
    return await this._scriptService.remove({
      id: Number(scriptId),
      projectId: Number(projectId),
    });
  }
}
