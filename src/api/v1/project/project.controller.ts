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

  @Patch(':projectId')
  public async update(@Param() param, @Body() dto: UpdateProjectDto) {
    return await this._projectService.update({
      id: Number(param.projectId),
      ...dto,
    });
  }

  @Delete(':projectId')
  public async remove(@Param() param) {
    return await this._projectService.remove(Number(param.projectId));
  }
}
