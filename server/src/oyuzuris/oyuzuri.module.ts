import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OyuzuriController } from './oyuzuri.controller';
import { User, UserSchema } from 'src/users/user.schema';
import { UserService } from 'src/users/user.service';
import { HttpModule } from '@nestjs/axios';
import { Oyuzuri, OyuzuriSchema } from 'src/oyuzuris/oyuzuri.schema';
import { OyuzuriService } from 'src/oyuzuris/oyuzuri.service';
import { Message, MessageSchema } from 'src/messages/message.schema';
import { MessageService } from 'src/messages/message.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Oyuzuri.name, schema: OyuzuriSchema },
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    HttpModule
  ],
  controllers: [OyuzuriController],
  providers: [OyuzuriService, UserService, MessageService],
})
export class OyuzuriModule {}