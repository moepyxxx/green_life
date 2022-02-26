import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Green as ModelGreen, Green, GreenDocument } from 'src/greens/green.schema';

@Injectable()
export class GreenService {

  constructor( @InjectModel(ModelGreen.name) private greenModel: Model<GreenDocument> ) {}

  async fetchGreen(greenId: string): Promise<Green> {
    return await this.greenModel.findById(greenId).exec();
  }
}