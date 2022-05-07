import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ICreate } from './interfaces/create';
import {
  MessageContainer,
  MessageContainerDocument,
} from './messageContainer.schema';

@Injectable()
export class MessageContainerService {
  constructor(
    @InjectModel(MessageContainer.name)
    private messageContainerModel: Model<MessageContainerDocument>,
  ) {}

  async create(
    request: ICreate,
  ): Promise<{ messageContainer: MessageContainer }> {
    try {
      const _id = new Types.ObjectId();
      const createMessageContainer = await new this.messageContainerModel({
        ...request,
        _id,
      });

      await createMessageContainer.save();

      return { messageContainer: createMessageContainer };
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
