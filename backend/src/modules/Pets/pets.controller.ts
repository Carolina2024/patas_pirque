import { Controller, Get } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pets } from './pets.entity';

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
