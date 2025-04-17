import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../User2/user.module';
import { Users } from '../User2/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    UserModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET || 'supersecret',
      signOptions:{expiresIn: '1h'}
    }),
    
  ],
  controllers: [AuthController],
  providers: [AuthService],

})
export class AuthModule {}
