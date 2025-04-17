import {
  Controller,
  Post,
  Body,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* POST/AUTH/SIGNIN
  @Post('login')
  @HttpCode(201)
  userLogin(@Body() data: LoginUserDto) {
    try {
      return this.authService.getLogin(data);
    } catch {
      throw new BadRequestException('Login error');
    }
  }
}
