import { Injectable } from '@nestjs/common';
import { Result } from './image.controller';
import { getStorage } from 'firebase-admin/storage';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class ImageService {
  async registerImage(filePath, _mimetype): Promise<Result> {
    const mimetype = _mimetype === 'image/png' ? 'png' : 'jpg';
    const bucket: Bucket = getStorage().bucket();

    const destination: string = filePath + '.' + mimetype;
    bucket.upload(filePath, {
      destination,
    });

    const imageUrl = bucket.file(destination).publicUrl();
    return await {
      imageUrl,
    };
  }
}
