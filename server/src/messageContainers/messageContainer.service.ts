import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { MessageService } from 'src/messages/message.service';
import { UserService } from 'src/users/user.service';
import { ICreate } from './interfaces/create';
import { IDetail, IMessageSummary, TMessageUser } from './interfaces/detail';
import { ISummaryResult } from './interfaces/summaryResult';
import {
  MessageContainer,
  MessageContainerDocument,
} from './messageContainer.schema';

@Injectable()
export class MessageContainerService {
  constructor(
    @InjectModel(MessageContainer.name)
    private messageContainerModel: Model<MessageContainerDocument>,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  async create(request: ICreate): Promise<MessageContainer> {
    try {
      const _id = new Types.ObjectId();
      const createMessageContainer = await new this.messageContainerModel({
        ...request,
        _id,
      });

      await createMessageContainer.save();

      return createMessageContainer;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  /**
   * メッセージコンテナ一覧を返す
   * @param requestUId リクエストユーザーのuId
   */
  async findSummary(requestUId: string): Promise<ISummaryResult[]> {
    const requestUser = await this.userService.fetchUserFromFirebaseUId(
      requestUId,
    );

    const messages = await this.messageContainerModel
      .find({
        $or: [
          { 'users.pertner': requestUser._id },
          { 'users.target': requestUser._id },
        ],
      })
      .exec();

    return await Promise.all(
      messages.map(async (messageContainer) => {
        const lastMessageIndex = messageContainer.messageIds.length - 1;
        const lastUpdateMessage = await this.messageService.findById(
          messageContainer.messageIds[lastMessageIndex],
        );

        const partnerId =
          messageContainer.users.partner.toString() ===
          requestUser._id.toString()
            ? messageContainer.users.owner
            : messageContainer.users.partner;

        const partner = await this.userService.fetchUserFromObjectId(
          partnerId.toString(),
        );

        return {
          _id: messageContainer._id,
          message: lastUpdateMessage.message,
          lastUpdatedAt: lastUpdateMessage.createdAt,
          partner: {
            _id: partner._id,
            imageUrl: partner.thumbnailUrl,
            displayName: partner.displayName,
            userName: partner.userName,
          },
          isNew: false,
        };
      }),
    );
  }

  /**
   * メッセージコンテナ詳細を返す
   * @param requestUId リクエストユーザーのuId
   * @param id メッセージコンテナID
   */
  async findOne(requestUId: string, id: string): Promise<IDetail> {
    const messageContainer = await this.messageContainerModel
      .findById(id)
      .exec();

    // リクエストユーザーを特定する
    const requestUser = await this.userService.fetchUserFromFirebaseUId(
      requestUId,
    );

    // パートナーを特定する
    const partnerId =
      messageContainer.users.partner.toString() === requestUser._id.toString()
        ? messageContainer.users.owner
        : messageContainer.users.partner;

    const partner = await this.userService.fetchUserFromObjectId(
      partnerId.toString(),
    );

    const messages: IMessageSummary[] = await Promise.all(
      messageContainer.messageIds.map(async (messageId) => {
        const messageModel = await this.messageService.findById(messageId);
        const messageUser: TMessageUser =
          requestUser._id.toString() === messageModel.fromUserId.toString()
            ? 'you'
            : 'partner';
        return {
          id: messageModel._id,
          user: messageUser,
          message: messageModel.message,
          createdAt: messageModel.createdAt,
        };
      }),
    );

    return {
      _id: messageContainer._id,
      partner: {
        _id: partner._id,
        imageUrl: partner.thumbnailUrl,
        userName: partner.userName,
        displayName: partner.displayName,
      },
      messages,
    };
  }

  /**
   * メッセージを追加する
   * @param messageContainerId
   * @param messageId
   */
  async addMessage(
    messageContainerId: Schema.Types.ObjectId | string,
    messageId: Schema.Types.ObjectId,
  ): Promise<MessageContainer> {
    await this.messageContainerModel.updateOne(
      { id: messageContainerId },
      {
        $push: {
          messageIds: messageId,
        },
      },
    );
    return await this.messageContainerModel.findById(messageContainerId);
  }

  async findById(id: string): Promise<MessageContainer> {
    return await this.messageContainerModel.findById(id);
  }
}
