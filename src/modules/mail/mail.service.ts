import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import {
  ConfirmCodeTypeEnum,
  IConfirmCode,
} from '@/modules/confirm-code/domain';
import { CommonError } from '@/common/error';

@Injectable()
export class MailService {
  private readonly _mailOptions = {
    [ConfirmCodeTypeEnum.REGISTRATION]: {
      from: this._configService.get('MAIL_USERNAME'),
      subject: 'Подтверждение регистрации',
      template: 'registration',
    },
    [ConfirmCodeTypeEnum.UPDATE_PASSWORD]: {
      from: this._configService.get('MAIL_USERNAME'),
      subject: 'Изменение пароля',
      template: 'update-password',
    },
  };
  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
  ) {}

  public async sendConfirmCode(code: IConfirmCode) {
    try {
      await this._mailerService.sendMail({
        ...this._mailOptions[code.type],
        to: code.destination,
        context: { code: code.value },
      });
    } catch (e) {
      throw new CommonError(
        { ctx: 'app', field: null, message: 'errors.confirm_code.send' },
        500,
      );
    }
  }
}
