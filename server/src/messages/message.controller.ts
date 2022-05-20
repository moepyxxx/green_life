import {
  Controller,
  Post,
  Headers,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  @Post('')
  async create(
    @Headers('Authorization') authorization: string,
    @Body()
    request: {
      message: string;
      messageContainerId: string;
    },
  ): Promise<boolean> {
    try {
      // なんかないのかな…あると思うけど…
      const isAuthed: string | false = await this.userService.verifyIdToken(
        authorization.replace('Bearer ', ''),
      );
      if (isAuthed) {
        return await this.messageService.createRequest(
          isAuthed,
          request.messageContainerId,
          request.message,
        );
      }
    } catch (e) {
      throw new HttpException(
        'this accoun is not authed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
