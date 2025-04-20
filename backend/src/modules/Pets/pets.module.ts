import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pets } from './pets.entity';

@Module({
  controllers: [PetsController],
  providers: [PetsService],
  imports:[TypeOrmModule.forFeature([Pets])],
  exports: [PetsService],
})
export class PetsModule {}
