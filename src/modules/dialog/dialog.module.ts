import { Module } from '@nestjs/common';
import { DialogService } from './dialog.service';
import { DialogController } from '@/api/v1/dialog/dialog.controller';
import { DialogRepository } from '@/repositories/dialog';
import { RespondentService } from '@/modules/respondent/service/respondent.service';
import { RespondentRepository } from '@/repositories/respondent';
import { ProjectRepository } from '@/repositories/project';
import { ScriptRepository } from '@/repositories/script';
import { DialogGateway } from '@/api/geteway/dialog/dialog.gateway';

@Module({
  providers: [
    DialogService,
    RespondentService,
    DialogRepository,
    RespondentRepository,
    ProjectRepository,
    ScriptRepository,
    DialogGateway,
  ],
  controllers: [DialogController],
})
export class DialogModule {}
