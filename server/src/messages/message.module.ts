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
import { PostService } from 'src/posts/post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    HttpModule,
  ],
  controllers: [MessageController],
  providers: [UserService, MessageService],
})
export class MessageModule {}
