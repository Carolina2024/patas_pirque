import { ConflictException, Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../User/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from '../User/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  //* POST/AUTH/LOGIN
  async getLogin(data: LoginUserDto) {
    if (!data?.email){
      throw new BadRequestException(`Correo requerido`);
    }
    const user = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      throw new BadRequestException(`Usuario no encontrado`);
    }
    if (!user.password) {
      throw new UnauthorizedException(`Contraseña requerida`);
    }
    const validPassword = data.password === user.password;

    if (!validPassword) {
      throw new BadRequestException(`Credenciales inválidas`);
    }
    //generar token
    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(userPayload);

    return { message: 'User logged in successfully', token };
  }

  async register(registerUserDto: RegisterUserDto){
     
     const existingUser = await this.userService.findByEmail(registerUserDto.email);
     if(existingUser){
       throw new ConflictException('User already existing');
     }

     return this.userService.create(registerUserDto);

  }
}
