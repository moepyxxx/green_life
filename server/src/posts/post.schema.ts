import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPin } from './interfaces/pin';
import { ITag } from 'src/tags/interfaces/tag';

export type PostDocument = Post & Document;

@Schema()
export class Post {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  imagePath: string;

  @Prop({ required: true })
  comment: string;

  @Prop()
  pins: IPin[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Tag' })
  tagIds: mongoose.Schema.Types.ObjectId[];

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ required: true, default: new Date() })
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);