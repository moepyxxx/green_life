import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ICreate } from './interfaces/create';
import { Oyuzuri, OyuzuriDocument } from './oyuzuri.schema';

@Injectable()
export class OyuzuriService {

  constructor( @InjectModel(Oyuzuri.name) private oyuzuriModel: Model<OyuzuriDocument> ) {}

  async create(post: ICreate): Promise<{ oyuzuri: Oyuzuri }> {

    try {
      const _id = new Types.ObjectId;
      const oyuzuri = await new this.oyuzuriModel({
        ...post,
        _id
      });

      await oyuzuri.save();
      
      return { oyuzuri };
    } catch(error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

}