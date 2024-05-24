import { Module } from '@nestjs/common';
import { RespondentService } from './service/respondent.service';
import { RespondentController } from '@/modules/respondent/controller';
import { RespondentRepository } from '@/repositories/respondent';
import { ProjectRepository } from '@/repositories/project';

@Module({
  providers: [RespondentService, RespondentRepository, ProjectRepository],
  controllers: [RespondentController],
})
export class RespondentModule {}
