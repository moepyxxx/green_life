import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GreenDocument = Green & Document;

@Schema()
export class Green {

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imagePath: string;

}

export const GreenSchema = SchemaFactory.createForClass(Green);