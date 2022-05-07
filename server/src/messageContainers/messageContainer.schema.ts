import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MessageContainerDocument = MessageContainer & Document;

@Schema()
export class MessageContainer {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Oyuzuri',
  })
  oyuzuriId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Message' })
  messageIds: mongoose.Schema.Types.ObjectId[];

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: null })
  updatedAt: Date | null;

  @Prop({ default: null })
  deletedAt: Date | null;
}

export const MessageSchema = SchemaFactory.createForClass(MessageContainer);
