import { Controller, Get } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pets } from './pets.entity';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiOperation({
    summary: 'Obtener todas las mascotas',
    description: 'Devuelve todas las mascotas de la plataforma.',
  })
  @ApiOkResponse({
    description: 'Retorno exitoso de todas las mascotas.',
    type: Pets,
    example: [
      {
        id: 1,
        name: 'garfield',
        race: 'criollo',
        age: 'Adulto',
        species: 'Gato',
        size: 'Mediano',
        isActive: true,
      },
      {
        id: 2,
        name: 'scooby doo',
        race: 'doberman',
        age: 'Adulto',
        species: 'Perro',
        size: 'Grande',
        isActive: true,
      },
    ],
  })
  @Public()
  @Get()
  async findAll(): Promise<Pets[]> {
    return await this.petsService.findAll();
  }
}
