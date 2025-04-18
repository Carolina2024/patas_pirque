import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pets } from './pets.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PetsService {

    constructor(
      @InjectRepository(Pets)
      private readonly petsRepository: Repository<Pets>
    ){}

    async findAll():Promise<Pets[]>{
       return await this.petsRepository.find(); 
    }
}
