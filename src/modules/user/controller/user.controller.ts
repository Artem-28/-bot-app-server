import { Controller } from '@nestjs/common';
import { UserService } from '@/modules/user/service';

@Controller('api/v1/users')
export class UserController {
  constructor(private _userService: UserService) {}
}
