import { Module } from '@nestjs/common';
import { RespondentService } from './respondent.service';
import { RespondentController } from '@/api/v1/respondent';
import { RespondentRepository } from '@/repositories/respondent';
import { ProjectRepository } from '@/repositories/project';

@Module({
  providers: [RespondentService, RespondentRepository, ProjectRepository],
  controllers: [RespondentController],
})
export class RespondentModule {}
