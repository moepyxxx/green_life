import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OyuzuriController } from './oyuzuri.controller';
import { User, UserSchema } from 'src/users/user.schema';
import { UserService } from 'src/users/user.service';
import { HttpModule } from '@nestjs/axios';
import { Oyuzuri, OyuzuriSchema } from 'src/oyuzuris/oyuzuri.schema';
import { OyuzuriService } from 'src/oyuzuris/oyuzuri.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Oyuzuri.name, schema: OyuzuriSchema },
      { name: User.name, schema: UserSchema },
    ]),
    HttpModule
  ],
  controllers: [OyuzuriController],
  providers: [OyuzuriService, UserService],
})
export class OyuzuriModule {}