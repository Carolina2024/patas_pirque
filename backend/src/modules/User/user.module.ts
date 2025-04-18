import { Global, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Users } from './user.entity';

@Global()
@Module({
     controllers: [UserController],
     providers: [UserService],
     imports:[TypeOrmModule.forFeature([Users])],
     exports: [UserService]
})
export class UserModule {}
