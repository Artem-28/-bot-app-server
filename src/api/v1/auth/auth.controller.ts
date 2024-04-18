import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { TransactionInterceptor } from '@/common/interceptors';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('registration')
  @UseInterceptors(TransactionInterceptor)
  public async registration() {
    await this._authService.registration();
  }
}
