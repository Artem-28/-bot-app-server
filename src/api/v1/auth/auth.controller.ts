import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import {
  ChangePasswordDto,
  RegistrationDto,
  SingInDto,
} from '@/api/v1/auth/dto';
import { JwtGuard } from '@/providers/jwt/jwt.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('registration')
  public async registration(@Body() dtp: RegistrationDto) {
    return await this._authService.registration(dtp);
  }

  @Patch('change_password')
  public async updatePassword(@Body() dto: ChangePasswordDto) {
    return await this._authService.changePassword(dto);
  }

  @Post('sing_in')
  public async singIn(@Body() dto: SingInDto) {
    return await this._authService.signIn(dto);
  }

  @Get('user')
  @UseGuards(JwtGuard)
  public async user(@Req() req) {
    return req.user;
  }
}
