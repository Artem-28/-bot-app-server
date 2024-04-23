import { Body, Controller, Post } from '@nestjs/common';
import { ConfirmCodeService } from '@/modules/confirm-code/confirm-code.service';
import {
  CheckConfirmCodeDto,
  CreateConfirmCodeDto,
} from '@/api/v1/confirm-code/dto';

@Controller('api/v1/confirm-codes')
export class ConfirmCodeController {
  constructor(private _confirmCodeService: ConfirmCodeService) {}

  @Post('send')
  public async send(@Body() dto: CreateConfirmCodeDto) {
    return this._confirmCodeService.create(dto);
  }

  @Post('check')
  public async check(@Body() dto: CheckConfirmCodeDto) {
    return this._confirmCodeService.check(dto);
  }
}
