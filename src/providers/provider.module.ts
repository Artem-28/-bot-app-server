import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSource } from '@/providers/typeorm';
import { mailingConfig } from '@/providers/mailing';
import { jwtConfig, JwtStrategy } from '@/providers/jwt';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSource.options),
    MailerModule.forRoot(mailingConfig),
    JwtModule.register(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtStrategy],
})
export class ProviderModule {}
