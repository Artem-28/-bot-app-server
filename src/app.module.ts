import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProviderModule } from '@/providers/provider.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProviderModule,
    UserModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
