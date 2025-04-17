import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';
import { AuthModule } from './modules/Auth/auth.module';

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
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
