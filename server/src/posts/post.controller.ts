import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostService } from './post.service';

export interface IFindSummaryAllRequest {
  page: string;
  count: string;
}

@Controller('posts')
export class PostController {
  
  constructor(private readonly postService: PostService) {}

  @Get()
  async findSummaryAll(@Query() params: IFindSummaryAllRequest) {

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
  
}
