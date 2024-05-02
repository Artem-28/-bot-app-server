import { Global, Module } from '@nestjs/common';
import { CheckPermissionService } from '@/providers/permission/check-permission.service';
import { ProjectRepository } from '@/repositories/project';

@Global()
@Module({
  providers: [CheckPermissionService, ProjectRepository],
  exports: [CheckPermissionService],
})
export class CheckPermissionModule {}
