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
import { Public } from '../../common/decorators/public.decorator'; 
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Inicio de sesión',
    description:
      'Permite iniciar sesión a los usuarios registrados en la plataforma.',
  })
  @ApiOkResponse({
    description: 'El usuario ha iniciado sesión exitosamente.',
    example: {
      message: 'Se ha iniciado sesión exitosamente.',
      token: 'ABC123',
    },
  })
  @ApiBadRequestResponse({
    description: 'El usuario ha ingresado mal los campos del formulario',
    example: {
      message: [
        'El correo es requerido',
        'Ingrese un correo con un formato válido',
        'La contraseña es requerida',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'El usuario ha ingresado credenciales inválidas',
    example: {
      message: 'Credenciales inválidas',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Public()  
  @Post('login')
  @HttpCode(200)
  userLogin(@Body() data: LoginUserDto) {
    try {
      return this.authService.getLogin(data);
    } catch {
      throw new BadRequestException('Login error');
    }
  }

  @ApiOperation({
    summary: 'Registrar usuario',
    description: 'Registra un usuario para la plataforma.',
  })
  @ApiCreatedResponse({
    description: 'El usuario se ha registrado exitosamente',
    example: {
      id: 0,
      name: 'John',
      email: 'john@example.com',
      password: 'JonnSecretPassword',
    },
  })
  @ApiBadRequestResponse({
    description: 'El usuario ha ingresado mal los campos del formulario',
    example: {
      message: [
        'El nombre es requerido',
        'El correo es requerido',
        'Ingrese un correo con un formato válido',
        'La contraseña debe ser de al menos 6 caracteres',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiConflictResponse({
    description: 'El usuario ingresado ya se encuentra registrado.',
    example: {
      message: 'El usuario ingresado ya se encuentra registrado.',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @Public()    
  @Post('register')
  @HttpCode(201)
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
