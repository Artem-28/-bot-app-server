import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { TransactionInterceptor } from '@/common/interceptors';
import { RegistrationDto } from '@/api/v1/auth/dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('registration')
  @UseInterceptors(TransactionInterceptor)
  public async registration(@Body() dtp: RegistrationDto) {
    return await this._authService.registration(dtp);
  }
}
