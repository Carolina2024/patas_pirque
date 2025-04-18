import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../User/user.module';
import { Users } from '../User/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Users]),
    UserModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET || 'supersecret',
      signOptions:{expiresIn: '1h'}
    }),
    
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],

})
export class AuthModule {}
