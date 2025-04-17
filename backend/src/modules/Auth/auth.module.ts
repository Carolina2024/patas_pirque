import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../User/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: "60s" },
  }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
