import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  Permission,
  PermissionGuard,
  RESPONDENT_CREATE,
} from '@/providers/permission';
import { JwtGuard } from '@/providers/jwt';
import { RespondentService } from '@/modules/respondent/service';
import { CreateRespondentDto } from '@/modules/respondent/controller';

@Controller('api/v1/projects/:projectId/respondents')
@UseGuards(PermissionGuard)
@UseGuards(JwtGuard)
export class RespondentController {
  constructor(private readonly _respondentService: RespondentService) {}

  @Post()
  @Permission(RESPONDENT_CREATE)
  public async create(@Param() param, @Body() dto: CreateRespondentDto) {
    return await this._respondentService.create({
      ...dto,
      projectId: Number(param.projectId),
    });
  }
}
