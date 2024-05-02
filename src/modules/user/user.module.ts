import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '@/api/v1/user';
import { UserRepository } from '@/repositories/user';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
