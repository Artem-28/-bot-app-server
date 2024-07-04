import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { MailService } from '@/modules/mail/mail.service';
import { TransactionInterceptor } from '@/common/interceptors';
import { ConfirmCodeService } from '@/modules/confirm-code/service';
import {
  CheckConfirmCodeDto,
  CreateConfirmCodeDto,
} from '@/modules/confirm-code/controller/dto';

@Controller('api/v1/confirm-codes')
export class ConfirmCodeController {
  constructor(
    private _confirmCodeService: ConfirmCodeService,
    private _mailService: MailService,
  ) {}

  @Post('send')
  @UseInterceptors(TransactionInterceptor)
  public async send(@Body() dto: CreateConfirmCodeDto) {
    const code = await this._confirmCodeService.create(dto);
    await this._mailService.sendConfirmCode(code);
    return code;
  }

  @Post('check')
  public async check(@Body() dto: CheckConfirmCodeDto) {
    return this._confirmCodeService.check(dto);
  }
}
