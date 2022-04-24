import { Module } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { HttpModule } from '@nestjs/axios';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
