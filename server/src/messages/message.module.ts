import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { UserService } from 'src/users/user.service';
import { HttpModule } from '@nestjs/axios';
import { Message, MessageSchema } from 'src/messages/message.schema';
import { MessageService } from 'src/messages/message.service';
import { MessageContainerService } from 'src/messageContainers/messageContainer.service';
import {
  MessageContainer,
  MessageContainerSchema,
} from 'src/messageContainers/messageContainer.schema';
import { MessageController } from './message.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
      { name: MessageContainer.name, schema: MessageContainerSchema },
    ]),
    HttpModule,
  ],
  controllers: [MessageController],
  providers: [UserService, MessageService, MessageContainerService],
})
export class MessageModule {}
