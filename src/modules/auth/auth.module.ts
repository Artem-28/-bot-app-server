import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from '@/repositories/user';
import { AuthController } from '@/api/v1/auth';
import { ConfirmCodeRepository } from '@/repositories/confirm-code';

@Module({
  providers: [AuthService, UserRepository, ConfirmCodeRepository],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
