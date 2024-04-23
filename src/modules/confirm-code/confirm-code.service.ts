import { Injectable } from '@nestjs/common';
import { ConfirmCodeRepository } from '@/repositories/confirm-code';
import { CreateConfirmCodeDto } from '@/api/v1/confirm-code/dto';
import { hGenerateCode } from '@/common/utils';
import {
  ConfirmCodeAggregate,
  ConfirmCodeTypeEnum,
} from '@/modules/confirm-code/domain';
import { CommonError } from '@/common/error';

@Injectable()
export class ConfirmCodeService {
  private readonly _codeOptions = {
    [ConfirmCodeTypeEnum.REGISTRATION]: {
      mask: '****-****-****',
      timeLive: 360,
      timeDelay: 120,
    },
  };
  constructor(private _confirmCodeRepository: ConfirmCodeRepository) {}

  public async create(dto: CreateConfirmCodeDto) {
    const { mask, timeDelay, timeLive } = this._codeOptions[dto.type];
    const code = await this._confirmCodeRepository.getOne({
      field: 'destination',
      value: dto.destination,
    });

    if (!code) {
      const newCode = ConfirmCodeAggregate.create({
        destination: dto.destination,
        type: dto.type,
        value: hGenerateCode(mask),
      });
      newCode.setLiveTime(timeLive);
      newCode.setDelayTime(timeDelay);
      return await this._confirmCodeRepository.create(newCode);
    }

    console.log('Code delay', code.delay);
    if (code.delay) {
      throw new CommonError({
        message: 'errors.confirmCode.delay',
        ctx: 'field',
        field: 'code',
      });
    }
    code.update({ value: hGenerateCode(mask) });
    code.setLiveTime(timeLive);
    code.setDelayTime(timeDelay);
    const updated = await this._confirmCodeRepository.update(code.id, code);
    if (updated) {
      return code;
    }
  }
}
