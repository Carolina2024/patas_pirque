import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from './user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../Auth/guards/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth() 
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<Users[]> {
    return this.userService.findAll();
  }
}
