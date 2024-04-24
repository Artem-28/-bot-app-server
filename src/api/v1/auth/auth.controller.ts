import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { ChangePasswordDto, RegistrationDto } from '@/api/v1/auth/dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('registration')
  public async registration(@Body() dtp: RegistrationDto) {
    return await this._authService.registration(dtp);
  }

  @Patch('change_password')
  public async updatePassword(@Body() dto: ChangePasswordDto) {
    await this._authService.changePassword(dto);
  }
}
