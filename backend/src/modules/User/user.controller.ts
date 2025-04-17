import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<Users[]> {
    return this.userService.findAll();
  }
}
