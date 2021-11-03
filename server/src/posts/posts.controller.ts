import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

export interface IFindSummaryAllRequest {
  page: string;
  count: string;
}

@Controller('posts')
export class PostsController {
  
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findSummaryAll(@Query() params: IFindSummaryAllRequest) {

    if (!params.page) {
      params.page = "1";
      params.count = "10";
    }
    return await this.postsService.findSummaryAll(params);
  }
  
}
