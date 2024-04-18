import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from '@/repositories/user';
import { AuthController } from '@/api/v1/auth';

@Module({
  providers: [AuthService, UserRepository],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
