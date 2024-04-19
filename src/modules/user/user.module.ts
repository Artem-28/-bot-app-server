import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '@/api/v1/user';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
