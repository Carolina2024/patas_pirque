import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './loginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../User/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}
  //* POST/AUTH/LOGIN
  async getLogin(data: LoginUserDto) {
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
}
