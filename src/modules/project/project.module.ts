import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from '@/api/v1/project';
import { ProjectRepository } from '@/repositories/project';

@Module({
  providers: [ProjectService, ProjectRepository],
  controllers: [ProjectController],
})
export class ProjectModule {}
