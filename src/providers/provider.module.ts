import { Module } from '@nestjs/common';
import { appDataSource } from '@/providers/typeorm';
import { mailingConfig } from '@/providers/mailing';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSource.options),
    MailerModule.forRoot(mailingConfig),
  ],
})
export class ProviderModule {}
