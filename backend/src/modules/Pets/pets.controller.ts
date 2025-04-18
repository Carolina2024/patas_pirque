import { Controller, Get, UseGuards } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pets } from './pets.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../Auth/guards/jwt-auth.guard';

@ApiTags('Pets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pets')
export class PetsController {

    constructor(
        private readonly petsService: PetsService
    ){}

    @Get()
    async findAll():Promise<Pets[]>{
        return await this.petsService.findAll();
    }
}
