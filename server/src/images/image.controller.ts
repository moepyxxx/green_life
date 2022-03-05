import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

export type Result = {
  imageUrl: string;
}

@Controller('images')
export class ImageController {
  
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads/'
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.registerImage(file.path, file.mimetype);
  }

}
