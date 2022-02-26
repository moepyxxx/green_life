import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  imagePath: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ type: [{
    position: {
      left: { type: Number },
      top: { type: Number },
    },
    greenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Green' }
  }]})
  pins: {
    position: {
      left: number,
      top: number,
    },
    greenId: mongoose.Schema.Types.ObjectId
  }[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Tag' })
  tagIds: mongoose.Schema.Types.ObjectId[];

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ required: true, default: new Date() })
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);