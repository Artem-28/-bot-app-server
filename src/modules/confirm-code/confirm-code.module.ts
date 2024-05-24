import { Module } from '@nestjs/common';
import { ConfirmCodeController } from '@/modules/confirm-code/controller';
import { ConfirmCodeService } from '@/modules/confirm-code/service';
import { ConfirmCodeRepository } from '@/repositories/confirm-code';
import { MailService } from '@/modules/mail/mail.service';

@Module({
  providers: [ConfirmCodeService, MailService, ConfirmCodeRepository],
  controllers: [ConfirmCodeController],
})
export class ConfirmCodeModule {}
