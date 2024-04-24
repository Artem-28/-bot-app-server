import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories/user';
import { RegistrationDto } from '@/api/v1/auth';
import { ConfirmCodeRepository } from '@/repositories/confirm-code';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _confirmCodeRepository: ConfirmCodeRepository,
  ) {}

  public async registration(dto: RegistrationDto) {
    // this._userRepository.create();
  }
}
