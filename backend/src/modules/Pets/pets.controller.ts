import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pets } from './pets.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../Auth/guards/jwt-auth.guard';
import { RolesGuard } from '../Auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { FindPetsDto } from './dto/find-pets.dto';
import { PaginatedResponse } from './interfaces/pagination.interface';

@ApiTags('Pets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiOperation({
    summary: 'Obtener todas las mascotas',
    description: 'Devuelve todas las mascotas con paginación y filtros',
  })
  @ApiOkResponse({
    description: 'Retorno exitoso de las mascotas',
    schema: {
        properties: {
            items: {
                type: 'array',
                items: { $ref: getSchemaPath(Pets) }
            },
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' }
        }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'El usuario no está autorizado',
    example: {
      message: 'No autorizado',
      statusCode: 401,
    },
  })
  @Public()
  @Get()
  async getAllPets(@Query() findPetsDto: FindPetsDto): Promise<PaginatedResponse>{
    return this.petsService.findAll(findPetsDto);
  }

  @ApiOperation({
    summary: 'Obtener una mascota por su ID',
    description: 'Devuelve la mascota con el ID correspondiente.',
  })
  @ApiOkResponse({
    description: 'Retorno exitoso de la mascota.',
    type: Pets,
  })
  @ApiNotFoundResponse({
    description: 'La mascota no fue encontrada',
    example: {
      message: 'Mascota no encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Get(':id')
  async getPetById(@Param('id') id: string): Promise<Pets> {
    return this.petsService.findById(id);
  }

  @ApiOperation({
    summary: 'Crear una nueva mascota',
    description: 'Crea una nueva mascota en la plataforma.',
  })
  @ApiCreatedResponse({
    description: 'La mascota ha sido creada exitosamente.',
    type: Pets,
  })
  @ApiForbiddenResponse({
    description: 'No tiene permisos para crear mascotas',
    example: {
      message: 'Acceso denegado',
      error: 'Forbidden',
      statusCode: 403,
    },
  })
  @Roles(Role.Admin)
  @Post()
  async createPet(@Body() createPetDto: CreatePetDto): Promise<Pets> {
    return this.petsService.create(createPetDto);
  }

  @ApiOperation({
    summary: 'Actualizar una mascota',
    description: 'Actualiza los datos de una mascota existente.',
  })
  @ApiOkResponse({
    description: 'La mascota ha sido actualizada exitosamente.',
    type: Pets,
  })
  @ApiNotFoundResponse({
    description: 'La mascota no fue encontrada',
    example: {
      message: 'Mascota no encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Roles(Role.Admin)
  @Put(':id')
  async updatePet(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<Pets> {
    return this.petsService.update(id, updatePetDto);
  }

  @ApiOperation({
    summary: 'Eliminar una mascota',
    description: 'Elimina una mascota de la plataforma.',
  })
  @ApiOkResponse({
    description: 'La mascota ha sido eliminada exitosamente.',
  })
  @ApiNotFoundResponse({
    description: 'La mascota no fue encontrada',
    example: {
      message: 'Mascota no encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Roles(Role.Admin)
  @Delete(':id')
  async deletePet(@Param('id') id: string): Promise<void> {
    return this.petsService.delete(id);
  }
  
}
