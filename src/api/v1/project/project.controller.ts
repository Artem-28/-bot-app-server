import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { ProjectService } from '@/modules/project/project.service';
import { JwtGuard } from '@/providers/jwt';
import { CreateProjectDto, UpdateProjectDto } from '@/api/v1/project/dto';
import {
  PermissionGuard,
  Permission,
  PROJECT_VIEW,
  PROJECT_UPDATE,
  PROJECT_REMOVE,
} from '@/providers/permission';

@Controller('api/v1/projects')
@UseGuards(JwtGuard)
export class ProjectController {
  constructor(private readonly _projectService: ProjectService) {}

  @Post()
  public async create(@Req() req, @Body() dto: CreateProjectDto) {
    return await this._projectService.create({ userId: req.user.id, ...dto });
  }

  @Get()
  public async list(@Req() req) {
    return await this._projectService.getAvailableUserProjects(req.user.id);
  }

  @Get(':projectId')
  @UseGuards(PermissionGuard)
  @Permission(PROJECT_VIEW)
  public async info(@Param() param) {
    return await this._projectService.info(Number(param.projectId));
  }

  @Patch(':projectId')
  @UseGuards(PermissionGuard)
  @Permission(PROJECT_UPDATE)
  public async update(@Param() param, @Body() dto: UpdateProjectDto) {
    return await this._projectService.update({
      id: Number(param.projectId),
      ...dto,
    });
  }

  @Delete(':projectId')
  @UseGuards(PermissionGuard)
  @Permission(PROJECT_REMOVE)
  public async remove(@Param() param) {
    return await this._projectService.remove(Number(param.projectId));
  }
}
