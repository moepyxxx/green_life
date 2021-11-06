import { Controller, Get, Param } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':id')
  findImage(@Param('id') id: string) {
    return this.imagesService.findImage;
  }
  
}
