import {
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { ISummaryResult } from './interfaces/summaryResult';
import { MessageContainerService } from './messageContainer.service';

@Controller('messagecontainers')
export class MessageContainerController {
  constructor(
    private readonly messageContainerService: MessageContainerService,
    private readonly userService: UserService,
  ) {}

  @Get('')
  async findSummary(
    @Headers('Authorization') authorization: string,
  ): Promise<ISummaryResult[]> {
    try {
      // なんかないのかな…あると思うけど…
      const isAuthed: string | false = await this.userService.verifyIdToken(
        authorization.replace('Bearer ', ''),
      );
      if (isAuthed) {
        return await this.messageContainerService.findSummary(isAuthed);
      }
    } catch (e) {
      throw new HttpException(
        'this accoun is not authed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get(':id')
  async findOne(
    @Headers('Authorization') authorization: string,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      // なんかないのかな…あると思うけど…
      const isAuthed: string | false = await this.userService.verifyIdToken(
        authorization.replace('Bearer ', ''),
      );
      if (isAuthed) {
        return await this.messageContainerService.findOne(isAuthed, id);
      }
    } catch (e) {
      throw new HttpException(
        'this accoun is not authed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
