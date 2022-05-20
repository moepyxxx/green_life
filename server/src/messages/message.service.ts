import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { MessageContainerService } from 'src/messageContainers/messageContainer.service';
import { UserService } from 'src/users/user.service';
import { ICreate } from './interfaces/create';
import { Message, MessageDocument, MessageType } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private readonly messageContainerService: MessageContainerService,
    private readonly userService: UserService,
  ) {}

  async findById(id: string | Schema.Types.ObjectId) {
    return this.messageModel.findById(id).exec();
  }

  async create(
    message: ICreate,
    fromUserId: Schema.Types.ObjectId,
    toUserId: Schema.Types.ObjectId,
    oyuzuriId: Schema.Types.ObjectId | string,
  ): Promise<{ message: Message }> {
    try {
      const _id = new Types.ObjectId();
      const createMessage = await new this.messageModel({
        ...message,
        fromUserId,
        toUserId,
        oyuzuriId,
        _id,
      });

      await createMessage.save();

      return { message: createMessage };
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  /**
   *
   * @param requestUId リクエストID
   * @param messageContainerId メッセージコンテナID
   */
  async createRequest(
    requestUId: string,
    messageContainerId: string,
    message: string,
  ) {
    const messageContainer = await this.messageContainerService.findById(
      messageContainerId,
    );

    const requestUser = await this.userService.fetchUserFromFirebaseUId(
      requestUId,
    );

    const isUserOwner =
      requestUser._id.toString() === messageContainer.users.owner.toString();

    const toUserId = isUserOwner
      ? messageContainer.users.partner
      : messageContainer.users.owner;

    const result = await this.create(
      {
        message,
        messageType: 'messaging',
      },
      requestUser._id,
      toUserId,
      messageContainer.oyuzuriId,
    );

    await this.messageContainerService.addMessage(
      messageContainerId,
      result.message._id,
    );

    return true;
  }

  // string型をSchema.Types.ObjectId型にキャストできないため、APIからのstringデータを受け取ると死ぬなんとかしたい
  async delete(
    fromUserId: Schema.Types.ObjectId,
    toUserId: any,
    messageType: MessageType,
  ) {
    await this.messageModel.updateOne(
      {
        fromUserId,
        toUserId,
        messageType,
      },
      {
        deletedAt: new Date(),
      },
    );
  }

  async searchMessageByType(
    fromUserId: Schema.Types.ObjectId,
    oyuzuriId: Schema.Types.ObjectId,
    messageType: MessageType,
  ) {
    return await this.messageModel
      .findOne({
        fromUserId,
        oyuzuriId,
        messageType,
      })
      .exec();
  }
}
