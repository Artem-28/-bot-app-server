import { Module } from '@nestjs/common';
import { UserController } from '@/modules/user/controller';
import { UserService } from '@/modules/user/service';
import { UserRepository } from '@/repositories/user';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
