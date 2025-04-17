import { Global, Module} from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { UserController } from './user.controller';

@Global()
@Module({
     controllers: [UserController],
     providers: [UserService],
     imports:[TypeOrmModule.forFeature([Users])],
     exports: [UserService]
})
export class UserModule {}
