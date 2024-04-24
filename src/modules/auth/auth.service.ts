import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories/user';
import { RegistrationDto } from '@/api/v1/auth';
import { ConfirmCodeRepository } from '@/repositories/confirm-code';
import { ConfirmCodeTypeEnum } from '@/modules/confirm-code/domain';
import { CommonError } from '@/common/error';
import * as bcrypt from 'bcrypt';
import { UserAggregate } from '@/modules/user/domain';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _confirmCodeRepository: ConfirmCodeRepository,
  ) {}

  public async registration(dto: RegistrationDto) {
    if (!dto.licenseAgreement) {
      throw new CommonError({
        field: 'licenseAgreement',
        ctx: 'field',
        message: 'errors.registration.licenseAgreement',
      });
    }

    const code = await this._confirmCodeRepository.getOne([
      { field: 'destination', value: dto.email },
      { field: 'type', value: ConfirmCodeTypeEnum.REGISTRATION },
    ]);

    if (!code) {
      throw new CommonError({
        field: 'code',
        ctx: 'field',
        message: 'errors.confirm_code.invalid',
      });
    }

    if (!code.live) {
      throw new CommonError({
        field: 'code',
        ctx: 'field',
        message: 'errors.confirm_code.live',
      });
    }

    code.confirm(dto.code);
    if (!code.confirmed) {
      throw new CommonError({
        field: 'code',
        ctx: 'field',
        message: 'errors.confirm_code.invalid',
      });
    }

    const password = await bcrypt.hash(dto.password, 10);
    const aggregate = UserAggregate.create({
      email: dto.email,
      password,
      licenseAgreement: dto.licenseAgreement,
    });
    aggregate.verifyEmail();
    aggregate.plainToInstance();

    const user = await this._userRepository.create(aggregate.instance);

    await this._confirmCodeRepository.remove(code.id);

    return user;
  }
}