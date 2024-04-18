import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories';

@Injectable()
export class AuthService {
  constructor(private _userRepository: UserRepository) {}

  public async registration() {
    this._userRepository.create();
  }
}
