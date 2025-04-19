import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from './user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../Auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { RolesGuard } from '../Auth/guards/roles.guard';
import { OwnerOrAdmin } from 'src/common/decorators/owner-or-admin.decorator';
import { OwnerOrAdminGuard } from '../Auth/guards/owner-or-admin.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard, OwnerOrAdminGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Roles(Role.Admin)
  @Get()
  async getAllUsers(): Promise<Users[]> {
    return this.userService.findAll();
  }

  @OwnerOrAdmin()
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Users> {
    return this.userService.findById(id);
  }
}
