import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { ICreate } from './interfaces/create';
import { PostService, TResult } from './post.service';

export interface IFindSummaryAllRequest {
  page: string;
  count: string;
}

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async findSummaryAll(@Query() params: IFindSummaryAllRequest) {
    if (!params.page) {
      params.page = '1';
      params.count = '10';
    }
    return await this.postService.findSummaryAll(params);
  }

  @Get(':id')
  async findOne(
    @Headers('Authorization') authorization: string,
    @Param('id') id: string,
  ) {
    try {
      const isAuthed: string | false = await this.userService.verifyIdToken(
        authorization.replace('Bearer ', ''),
      );
      if (isAuthed) {
        return await this.postService.findOne(id, isAuthed);
      }
    } catch (_) {
      return await this.postService.findOne(id, false);
    }
  }

  @Post()
  async create(
    @Headers('Authorization') authorization: string,
    @Body() post: ICreate,
  ): Promise<TResult> {
    try {
      // なんかないのかな…あると思うけど…
      const isAuthed: string | false = await this.userService.verifyIdToken(
        authorization.replace('Bearer ', ''),
      );
      if (isAuthed) {
        return await this.postService.create(post, isAuthed);
      }
    } catch (e) {
      throw new HttpException(
        'this accoun is not authed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
