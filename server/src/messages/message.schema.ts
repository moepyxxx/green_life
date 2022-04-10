import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MessageDocument = Message & Document;

export type MessageType = 'request' | 'userConfirm' | 'returnConfirm' | 'messaging' | 'cancel';

@Schema()
export class Message {

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Oyuzuri' })
  oyuzuriId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  fromUserId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  toUserId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, default: '' })
  message: string;

  @Prop({ type: String, default: 'messaging' })
  messageType: MessageType;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: null })
  endedAt: Date | null;
}

export const MessageSchema = SchemaFactory.createForClass(Message);