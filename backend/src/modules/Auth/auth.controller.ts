import {
  Controller,
  Post,
  Body,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
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

  @Post('register')
  @HttpCode(201)
  create(@Body() registerUserDto:RegisterUserDto ){
          return this.authService.register(registerUserDto);
      }
}
