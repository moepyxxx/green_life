import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  constructor() {}

  findImage(id: string) {
    return 'http://server:3001/sample_1.jpg';
  }

}
