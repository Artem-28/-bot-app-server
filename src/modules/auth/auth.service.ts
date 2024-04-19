import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories/user';
import { RegistrationDto } from '@/api/v1/auth';

@Injectable()
export class AuthService {
  constructor(private _userRepository: UserRepository) {}

  public async registration(dto: RegistrationDto) {
    // this._userRepository.create();
  }
}
