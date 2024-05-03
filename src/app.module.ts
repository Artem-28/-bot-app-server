import { Module } from '@nestjs/common';
import { ProviderModule } from '@/providers/provider.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { ConfirmCodeModule } from './modules/confirm-code/confirm-code.module';
import { CommonModule } from '@/common/common.module';
import { ProjectModule } from './modules/project/project.module';
import { CheckPermissionModule } from '@/providers/permission';
import { ScriptModule } from './modules/script/script.module';

@Module({
  imports: [
    CommonModule,
    ProviderModule,
    UserModule,
    AuthModule,
    ConfirmCodeModule,
    ProjectModule,
    CheckPermissionModule,
    ScriptModule,
  ],
})
export class AppModule {}
