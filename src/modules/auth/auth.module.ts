import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserRepository } from '@/repositories';

@Module({
  providers: [AuthService, UserRepository],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
