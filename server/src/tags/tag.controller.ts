import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';


@Controller('tags')
export class TagController {
  
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll() {
    return await this.tagService.fetchAll();
  }

}
