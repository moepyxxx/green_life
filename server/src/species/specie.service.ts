import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specie as ModelSpecie, Specie, SpecieDocument } from 'src/species/specie.schema';

@Injectable()
export class SpecieService {

  constructor( @InjectModel(ModelSpecie.name) private tagModel: Model<SpecieDocument> ) {}

  async fetchSpecie(specieId: string): Promise<Specie> {
    return await this.tagModel.findById(specieId).exec();
  }
}