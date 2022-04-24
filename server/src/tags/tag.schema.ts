import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema()
export class Tag {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ required: true, default: new Date() })
  updatedAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
