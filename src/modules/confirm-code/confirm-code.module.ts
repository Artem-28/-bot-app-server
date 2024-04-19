import { Module } from '@nestjs/common';
import { ConfirmCodeService } from './confirm-code.service';
import { ConfirmCodeController } from '@/api/v1/confirm-code';

@Module({
  providers: [ConfirmCodeService],
  controllers: [ConfirmCodeController],
})
export class ConfirmCodeModule {}
