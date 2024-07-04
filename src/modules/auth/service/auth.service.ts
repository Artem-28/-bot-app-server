import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories/user';
import { ChangePasswordDto, RegistrationDto, SingInDto } from '@/modules/auth/controller';
import { ConfirmCodeRepository } from '@/repositories/confirm-code';
import { CommonError } from '@/common/error';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfirmCodeTypeEnum } from '@/models/confirm-code';
import { UserAggregate } from '@/models/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userRepository: UserRepository,
    private readonly _confirmCodeRepository: ConfirmCodeRepository,
  ) {}

  public async registration(dto: RegistrationDto): Promise<UserAggregate> {
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

    code.confirm(dto.code);
    code.validate(['live', 'confirmed']);

    const password = await bcrypt.hash(dto.password, 10);
    const aggregate = UserAggregate.create({
      email: dto.email,
      password,
      licenseAgreement: dto.licenseAgreement,
    });
    aggregate.verifyEmail();

    const user = await this._userRepository.create(aggregate.instance);

    await this._confirmCodeRepository.remove(code.id);

    return user;
  }

  public async changePassword(dto: ChangePasswordDto): Promise<boolean> {
    const user = await this._userRepository.getOne({
      field: 'email',
      value: dto.email,
    });

    if (!user) {
      throw new CommonError({
        field: 'email',
        ctx: 'field',
        message: 'errors.registration.user_not_registered',
      });
    }

    const code = await this._confirmCodeRepository.getOne([
      { field: 'destination', value: dto.email },
      { field: 'type', value: ConfirmCodeTypeEnum.UPDATE_PASSWORD },
    ]);

    if (!code) {
      throw new CommonError({
        field: 'code',
        ctx: 'field',
        message: 'errors.confirm_code.invalid',
      });
    }

    code.confirm(dto.code);
    code.validate(['live', 'confirmed']);

    const password = await bcrypt.hash(dto.password, 10);
    const success = this._userRepository.update(user.id, { password });

    await this._confirmCodeRepository.remove(code.id);
    return success;
  }

  public async signIn(dto: SingInDto) {
    const user = await this._userRepository.getOne({
      field: 'email',
      value: dto.email,
    });

    if (!user) {
      throw new CommonError({
        field: 'email',
        ctx: 'field',
        message: 'errors.sing_in.email.invalid',
      });
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new CommonError({
        field: 'email',
        ctx: 'field',
        message: 'errors.sing_in.email.invalid',
      });
    }

    const payload = { username: user.email, id: user.id };

    return {
      accessToken: this._jwtService.sign(payload),
      typeToken: 'Bearer',
      user,
    };
  }
}
