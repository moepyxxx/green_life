import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TOyuzuriStatus } from './interfaces/oyuzuriStatus';

export type OyuzuriDocument = Oyuzuri & Document;

@Schema()
export class Oyuzuri {

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  postId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  oyuzuriUserId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  oyuzuriTargetUserId: mongoose.Schema.Types.ObjectId | null;
  
  @Prop({ type: String, default: '' })
  oyuzuriComment: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] })
  requestUsers: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: String, default: 'wantedly' })
  status: TOyuzuriStatus;

  @Prop({ type: String, default: null })
  cancelMessage: null | string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: null })
  endedAt: Date | null;
}

export const OyuzuriSchema = SchemaFactory.createForClass(Oyuzuri);