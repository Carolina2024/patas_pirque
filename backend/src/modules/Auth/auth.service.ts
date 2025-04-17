import { ConflictException, Injectable, BadRequestException } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from '../user/user.service';

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
      throw new BadRequestException(`Email required`);
    }
    const user = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      throw new BadRequestException(`User not found`);
    }
    if (!user.password) {
      throw new BadRequestException(`Password required`);
    }
    const validPassword = data.password === user.password;

    if (!validPassword) {
      throw new BadRequestException(`Invalidate credentials`);
    }
    //generar token
    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(userPayload);

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
