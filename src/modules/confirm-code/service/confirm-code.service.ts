import { Injectable } from '@nestjs/common';
import { ConfirmCodeRepository } from '@/repositories/confirm-code';
import {
  CheckConfirmCodeDto,
  CreateConfirmCodeDto,
} from '@/modules/confirm-code/controller/dto';
import { hGenerateCode } from '@/common/utils';
import { CommonError } from '@/common/error';
import {
  ConfirmCodeAggregate,
  ConfirmCodeTypeEnum,
} from '@/models/confirm-code';

@Injectable()
export class ConfirmCodeService {
  private readonly _codeOptions = {
    [ConfirmCodeTypeEnum.REGISTRATION]: {
      mask: '######',
      timeLive: 360,
      timeDelay: 120,
    },
    [ConfirmCodeTypeEnum.UPDATE_PASSWORD]: {
      mask: '######',
      timeLive: 360,
      timeDelay: 120,
    },
  };
  constructor(private _confirmCodeRepository: ConfirmCodeRepository) {}

  public async create(
    dto: CreateConfirmCodeDto,
  ): Promise<ConfirmCodeAggregate> {
    const { mask, timeDelay, timeLive } = this._codeOptions[dto.type];
    const code = await this._confirmCodeRepository.getOne([
      { field: 'destination', value: dto.destination },
      { field: 'type', value: dto.type },
    ]);

    if (!code) {
      const newCode = ConfirmCodeAggregate.create({
        destination: dto.destination,
        type: dto.type,
        value: hGenerateCode(mask),
      });
      newCode.setLiveTime(timeLive);
      newCode.setDelayTime(timeDelay);
      return await this._confirmCodeRepository.create(newCode.instance);
    }

    if (code.delay) {
      throw new CommonError({
        message: 'errors.confirm_code.delay',
        ctx: 'field',
        field: 'code',
      });
    }
    code.update({ value: hGenerateCode(mask) });
    code.setLiveTime(timeLive);
    code.setDelayTime(timeDelay);
    const updated = await this._confirmCodeRepository.update(
      code.id,
      code.instance,
    );
    if (!updated) {
      throw new CommonError({
        message: 'errors.confirm_code.create',
        ctx: 'app',
        field: null,
      });
    }

    return code;
  }

  public async check(dto: CheckConfirmCodeDto) {
    const code = await this._confirmCodeRepository.getOne([
      { field: 'destination', value: dto.destination },
      { field: 'type', value: dto.type },
    ]);

    if (!code) {
      throw new CommonError({
        message: 'errors.confirm_code.invalid',
        ctx: 'field',
        field: 'code',
      });
    }

    code.confirm(dto.code);
    return code;
  }
}
