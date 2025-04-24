import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Pets } from './pets.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindPetsDto } from './dto/find-pets.dto';
import { PaginatedResponse } from './interfaces/pagination.interface';

@Injectable()
export class PetsService {

    constructor(
      @InjectRepository(Pets)
      private readonly petsRepository: Repository<Pets>
    ){}

    async findAll(findPetsDto: FindPetsDto):Promise<PaginatedResponse>{
      const { page = 1, limit = 10, ...filters } = findPetsDto;
      
      const whereClause: any = { isActive: true };
      
      if (filters.name) {
          whereClause.name = Like(`%${filters.name}%`);
      }
      if (filters.race) {
          whereClause.race = Like(`%${filters.race}%`);
      }
      if (filters.species) {
          whereClause.species = filters.species;
      }
      if (filters.age) {
          whereClause.age = filters.age;
      }
      if (filters.size) {
          whereClause.size = filters.size;
      }

      const [items, total] = await this.petsRepository.findAndCount({
          where: whereClause,
          skip: (page - 1) * limit,
          take: limit,
          order: { name: 'ASC' }
      });

      return {
          items,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
      };
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
      const existingPet = await this.petsRepository.findOne({
        where: { name: createPetDto.name,
                species: createPetDto.species,
                race: createPetDto.race,
                age: createPetDto.age,
                size: createPetDto.size
         }
      })
      if(existingPet){
        throw new ConflictException('Ya existe una mascota con los mismos datos');
      }
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
