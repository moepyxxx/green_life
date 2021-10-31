import { Controller, HttpStatus, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {
  
  constructor(private readonly postsService: PostsService) {}

  @Get('posts')
  getPosts(@Param('page') page : number, @Res() res: Response) {
    res.status(HttpStatus.OK)
      .json(this.postsService.getPosts(page))
  }
}
