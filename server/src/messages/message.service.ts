import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { ICreate } from './interfaces/create';
import { Message, MessageDocument, MessageType } from './message.schema';

@Injectable()
export class MessageService {

  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

  async create(
    message: ICreate,
    fromUserId: Schema.Types.ObjectId,
    toUserId: Schema.Types.ObjectId,
    oyuzuriId: Schema.Types.ObjectId | string
  ): Promise<{ message: Message }> {

    try {
      const _id = new Types.ObjectId;
      const createMessage = await new this.messageModel({
        ...message,
        fromUserId,
        toUserId,
        oyuzuriId,
        _id
      });

      await createMessage.save();
      
      return { message: createMessage };
    } catch(error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  // string型をSchema.Types.ObjectId型にキャストできないため、APIからのstringデータを受け取ると死ぬなんとかしたい
  async delete(fromUserId: Schema.Types.ObjectId, toUserId: any, messageType: MessageType) {
    await this.messageModel.updateOne({
      fromUserId,
      toUserId,
      messageType
    }, {
      deletedAt: new Date()
    })
  }

  async searchMessageByType(
    fromUserId: Schema.Types.ObjectId,
    oyuzuriId: Schema.Types.ObjectId,
    messageType: MessageType
  ) {
    return await this.messageModel.findOne({
      fromUserId,
      oyuzuriId,
      messageType
    }).exec()
  }

}