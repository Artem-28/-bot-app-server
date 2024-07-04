import { Module } from '@nestjs/common';
import { ProjectController } from '@/modules/project/controller';
import { ProjectService } from '@/modules/project/service';
import { ProjectRepository } from '@/repositories/project';

@Module({
  providers: [ProjectService, ProjectRepository],
  controllers: [ProjectController],
})
export class ProjectModule {}
