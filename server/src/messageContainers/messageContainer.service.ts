import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageService } from 'src/messages/message.service';
import { UserService } from 'src/users/user.service';
import { ICreate } from './interfaces/create';
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
            userName: partner.userName,
          },
          isNew: false,
        };
      }),
    );
  }
}
