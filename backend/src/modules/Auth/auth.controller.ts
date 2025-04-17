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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* POST/AUTH/SIGNIN
  @Post('signin')
  @HttpCode(201)
  userLogin(@Body() data: LoginUserDto) {
    try {
      return this.authService.getLogin(data);
    } catch {
      throw new BadRequestException('Error al loguear');
    }
  }

  @Post('register')
  @HttpCode(201)
  create(@Body() registerUserDto:RegisterUserDto ){
          return this.authService.register(registerUserDto);
      }
}
