import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './modules/User/user.module';
import typeOrmConfig from './config/typeorm.config';
import { AuthModule } from './modules/Auth/auth.module';
import { PetsModule } from './modules/Pets/pets.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/Auth/guards/jwt-auth.guard';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeOrmConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const config = configService.get<TypeOrmModuleOptions>('typeorm');
        if (!config) {
          throw new Error('TypeORM configuration is missing in ConfigService');
        }
        return config;
      },
    }),
    UserModule,
    AuthModule,
    PetsModule
  ],
  controllers: [],
  providers: [
    {
      provide : APP_GUARD,      
      useClass: JwtAuthGuard,   
    },
  ],
})
export class AppModule {}
