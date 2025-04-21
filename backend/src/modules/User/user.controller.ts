import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from './user.entity';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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

  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description:
      'Devuelve todos los usuarios de la plataforma. Disponible solo para usuarios de rol Administrador',
  })
  @ApiOkResponse({
    description: 'Retorno exitoso de todos los usuarios.',
    type: Users,
    example: [
      {
        id: 1,
        name: 'John',
        lastName: 'Doe',
        birthDate: '2000-01-01',
        dni: '12345678',
        gender: 'Masculino',
        email: 'john@example.com',
        password: 'john123!',
        role: 'admin',
        isActive: true,
      },
      {
        id: 2,
        name: 'Jane',
        lastName: 'Doe',
        birthDate: '2002-12-12',
        dni: '75708289',
        gender: 'Femenino',
        email: 'jane@example.com',
        password: 'jane123!',
        role: 'user',
        isActive: true,
      },
    ],
  })
  @ApiUnauthorizedResponse({
    description: 'El usuario no está autorizado ',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiForbiddenResponse({
    description: 'El usuario no posee los permisos para acceder al recurso ',
    example: {
      message: 'Forbidden resource',
      error: 'Forbidden',
      statusCode: 403,
    },
  })
  @Roles(Role.ADMIN)
  @Get()
  async getAllUsers(): Promise<Users[]> {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener un usuario por su id',
    description:
      'Devuelve el usuario con el id correspondiente. Solo puede ser accedido por un Administrador o el usuario con su mismo id',
  })
  @ApiOkResponse({
    description: 'Retorno exitoso del usuario con el id indicado.',
    type: Users,
    example: {
      id: 1,
      name: 'John',
      lastName: 'Doe',
      birthDate: '2000-01-01',
      dni: '12345678',
      gender: 'Masculino',
      email: 'john@example.com',
      password: 'john123!',
      role: 'admin',
      isActive: true,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'El usuario no está autorizado',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiForbiddenResponse({
    description: 'El usuario no posee los permisos para acceder al recurso',
    example: {
      message: 'Forbidden resource',
      error: 'Forbidden',
      statusCode: 403,
    },
  })
  @ApiNotFoundResponse({
    description: 'El usuario con el id indicado no existe',
    example: {
      message: 'Usuario no encontrado',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @OwnerOrAdmin()
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Users> {
    return this.userService.findById(id);
  }
}
