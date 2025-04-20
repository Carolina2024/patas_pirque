import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pets } from './pets.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
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

    async findById(id: string): Promise<Pets> {
      const pet = await this.petsRepository.findOne({ 
        where: { id: id, isActive: true } 
      });
      
      if (!pet) {
        throw new NotFoundException('Mascota no encontrada');
      }
      
      return pet;
    }
  
    async create(createPetDto: CreatePetDto): Promise<Pets> {
      const pet = this.petsRepository.create(createPetDto);
      return this.petsRepository.save(pet);
    }
  
    async update(id: string, updatePetDto: UpdatePetDto): Promise<Pets> {
      const pet = await this.findById(id);
      const updatedPet = Object.assign(pet, updatePetDto);
      return this.petsRepository.save(updatedPet);
    }
  
    async delete(id: string): Promise<void> {
      const pet = await this.findById(id);
      pet.isActive = false;
      await this.petsRepository.save(pet);
    }
}
