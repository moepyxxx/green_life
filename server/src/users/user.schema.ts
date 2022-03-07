import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  firebaseUid: string;

  @Prop({ required: true, default: 'https://storage.googleapis.com/greenlife-midori.appspot.com/defaults/green-chan.png' })
  thumbnailUrl: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  email: string;
  
  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ required: true, default: new Date() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);