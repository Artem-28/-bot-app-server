import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProviderModule } from '@/providers/provider.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { ConfirmCodeModule } from './modules/confirm-code/confirm-code.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProviderModule,
    UserModule,
    AuthModule,
    ConfirmCodeModule,
  ],
  providers: [],
})
export class AppModule {}
