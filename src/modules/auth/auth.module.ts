import { Module } from '@nestjs/common';
import { UserRepository } from '@/repositories/user';
import { AuthController } from '@/modules/auth/controller';
import { ConfirmCodeRepository } from '@/repositories/confirm-code';
import { UserService } from '@/modules/user/service';
import { AuthService } from '@/modules/auth/service';

@Module({
  providers: [AuthService, UserRepository, ConfirmCodeRepository, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
