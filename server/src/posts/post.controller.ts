import { Body, Controller, Get, Param, Post, Query, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
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
    private readonly authService: AuthService
  ) {}

  @Get()
  async findSummaryAll(@Headers("Authorization") authorization: string, @Query() params: IFindSummaryAllRequest) {

    // なんかないのかな…あると思うけど…
    const isAuthed: boolean = await this.authService.verifyIdToken(authorization.replace('Bearer ', ''));
    if (!isAuthed) {
      throw new HttpException("this accoun is not authed", HttpStatus.UNAUTHORIZED);
    }

    if (!params.page) {
      params.page = "1";
      params.count = "10";
    }
    return await this.postService.findSummaryAll(params);
  }
  
  @Get(':id')
  async findOne(@Param('id') id : string) {
    return await this.postService.findOne(id);
  }

  @Post()
  async create(@Body() post: ICreate) : Promise<TResult> {
    return await this.postService.create(post);
  }
  
}
