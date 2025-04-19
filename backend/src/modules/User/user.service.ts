import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from '../Auth/dto/registerUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<Users> {
    const user = this.userRepository.create(registerUserDto);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<Users> {
   const user = await this.userRepository.findOne({ where: { id } });
   if (!user){
      throw new NotFoundException(`Usuario no encontrado`);
   }
    return user
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }
}
