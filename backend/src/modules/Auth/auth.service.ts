import {
  ConflictException,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../User/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from '../User/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getLogin(data: LoginUserDto) {
    if (!data?.email) {
      throw new BadRequestException(`Correo requerido`);
    }
    const user = await this.usersRepository.findOne({
      where: { email: data.email, isActive: true },
    });
    if (!user) {
      throw new BadRequestException(`Usuario no encontrado`);
    }
    if (!user.password) {
      throw new BadRequestException(`Contraseña requerida`);
    }
    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(`Credenciales inválidas`);
    }

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(userPayload);

    return { message: 'Se ha iniciado sesión exitosamente.', token };
  }

  async register(registerUserDto: RegisterUserDto) {
    const existingUser = await this.userService.findByEmail(
      registerUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException(
        'El usuario ingresado ya se encuentra registrado.',
      );
    }

    const saltOrRounds = 12;
    const passwordHash = await bcrypt.hash(
      registerUserDto.password,
      saltOrRounds,
    );
    registerUserDto.password = passwordHash;

    return this.userService.create(registerUserDto);
  }
}
