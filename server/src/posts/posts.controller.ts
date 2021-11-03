import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

export interface IFindSummaryAllRequest {
  page: number;
  count: number;
}

@Controller('posts')
export class PostsController {
  
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findSummaryAll(@Param() params: IFindSummaryAllRequest) {
    return await this.postsService.findSummaryAll(params);
  }
  
}
