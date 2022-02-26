import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpecieDocument = Specie & Document;

@Schema()
export class Specie {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imagePath: string;

}

export const SpecieSchema = SchemaFactory.createForClass(Specie);