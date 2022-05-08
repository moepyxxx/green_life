import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { MessageService } from 'src/messages/message.service';
import { ICreate as ICreateMessage } from 'src/messages/interfaces/create';
import { UserService } from 'src/users/user.service';
import { ICreate } from './interfaces/create';
import { ICreate as IMessageCreate } from '../messageContainers/interfaces/create';
import { Oyuzuri, OyuzuriDocument } from './oyuzuri.schema';
import { MessageContainerService } from 'src/messageContainers/messageContainer.service';
import { User } from 'src/users/user.schema';
import { IOyuzuriRequestUser } from 'src/posts/interfaces/oyuzuriRequestUser';
import { IOyuzuri } from './interfaces/oyuzuri';

@Injectable()
export class OyuzuriService {
  constructor(
    @InjectModel(Oyuzuri.name) private oyuzuriModel: Model<OyuzuriDocument>,
    private readonly userService: UserService,
    private readonly messageSerivce: MessageService,
    private readonly messageContainerSerivce: MessageContainerService,
  ) {}

  async findByPostId(postId: Schema.Types.ObjectId): Promise<Oyuzuri> {
    return this.oyuzuriModel.findOne({ postId }).exec();
  }

  /**
   *
   * @param oyuzuriOwnerId おゆずりオーナーID
   * @param requestUId リクエストユーザーのuId
   */
  async findOne(oyuzuriOwnerId: string, requestUId: string): Promise<IOyuzuri> {
    // おゆずりを特定
    const oyuzuri = await this.oyuzuriModel.findById(oyuzuriOwnerId).exec();

    // オーナーを特定
    const owner: User = await this.userService.fetchUser(
      oyuzuri.oyuzuriUserId.toString(),
    );

    const isPostMyself = owner.firebaseUid === requestUId;
    console.log('isPostMyself', isPostMyself);
    return isPostMyself
      ? this.formatMyselfOne(oyuzuri)
      : this.formatOtherOne(oyuzuri, requestUId);
  }

  async formatMyselfOne(oyuzuri: Oyuzuri): Promise<IOyuzuri> {
    const init: IOyuzuri = {
      _id: oyuzuri._id,
      status: oyuzuri.status,
      oyuzuriComment: oyuzuri.oyuzuriComment,
      isPostMyself: true,
    };

    if (oyuzuri.status === 'wantedly') {
      const oyuzuriRequestUsers: IOyuzuriRequestUser[] | null =
        await Promise.all(
          oyuzuri.requestUsers.map(async (userId) => {
            const requestUser = await this.userService.fetchUserFromObjectId(
              userId.toString(),
            );
            const userMessage = await this.messageSerivce.searchMessageByType(
              requestUser._id,
              oyuzuri._id,
              'request',
            );
            return {
              userId: requestUser._id,
              displayName: requestUser.displayName,
              thumbnailUrl: requestUser.thumbnailUrl,
              userName: requestUser.userName,
              message: userMessage.message,
              createdAt: userMessage.createdAt,
            };
          }),
        );
      return {
        ...init,
        oyuzuriRequestUsers,
      };
    } else if (oyuzuri.status === 'canceled') {
      return {
        ...init,
      };
    } else {
      const requestUser = await this.userService.fetchUserFromObjectId(
        oyuzuri.oyuzuriTargetUserId.toString(),
      );

      if (oyuzuri.status === 'confirm') {
        const confirmMessage = await this.messageSerivce.searchMessageByType(
          oyuzuri.oyuzuriUserId,
          oyuzuri._id,
          'confirm',
        );

        return {
          ...init,
          oyuzuriTargetUser: {
            userId: requestUser._id,
            displayName: requestUser.displayName,
            thumbnailUrl: requestUser.thumbnailUrl,
            userName: requestUser.userName,
            message: confirmMessage.message,
            createdAt: confirmMessage.createdAt,
          },
        };
      } else if (oyuzuri.status === 'messaging') {
        return {
          ...init,
          oyuzuriTargetUser: {
            userId: requestUser._id,
            displayName: requestUser.displayName,
            thumbnailUrl: requestUser.thumbnailUrl,
            userName: requestUser.userName,
          },
          messageContainerId: oyuzuri.messageContainerId,
        };
      } else if (oyuzuri.status === 'complete') {
        return {
          ...init,
          oyuzuriTargetUser: {
            userId: requestUser._id,
            displayName: requestUser.displayName,
            thumbnailUrl: requestUser.thumbnailUrl,
            userName: requestUser.userName,
          },
        };
      }
    }
  }

  async formatOtherOne(
    oyuzuri: Oyuzuri,
    requestUId: string,
  ): Promise<IOyuzuri> {
    const accessUser = await this.userService.fetchUserFromFirebaseUId(
      requestUId,
    );

    const isRequest = oyuzuri.requestUsers.includes(accessUser._id);
    const init = {
      _id: oyuzuri._id,
      status: oyuzuri.status,
      oyuzuriComment: oyuzuri.oyuzuriComment,
      isPostMyself: false,
      isRequest,
    };

    if (oyuzuri.status === 'wantedly') {
      return init;
    }

    const isTargetUser =
      oyuzuri.oyuzuriTargetUserId.toString() === accessUser._id.toString();

    if (oyuzuri.status === 'complete' || oyuzuri.status === 'canceled') {
      return {
        ...init,
        isTargetUser,
      };
    }

    if (oyuzuri.status === 'confirm') {
      const confirmMessage = await this.messageSerivce.searchMessageByType(
        oyuzuri.oyuzuriUserId,
        oyuzuri._id,
        'confirm',
      );

      return {
        ...init,
        isTargetUser,
        confirmMessage: confirmMessage.message,
      };
    }

    if (oyuzuri.status === 'messaging') {
      return {
        ...init,
        isTargetUser,
        messageContainerId: oyuzuri.messageContainerId,
      };
    }
  }

  /**
   * おゆずりを作成する
   * @param post リクエスト
   */
  async create(post: ICreate): Promise<{ oyuzuri: Oyuzuri }> {
    try {
      const _id = new Types.ObjectId();
      const oyuzuri = await new this.oyuzuriModel({
        ...post,
        _id,
      });

      await oyuzuri.save();

      return { oyuzuri };
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  /**
   * おゆずりをリクエストする
   * @param oyuzuriOwnerId おゆずりオーナーID
   * @param requestUId リクエストユーザーのuId
   * @param message メッセージ
   */
  async request(
    oyuzuriOwnerId: string,
    requestUId: string,
    request: {
      message: string;
    },
  ): Promise<boolean> {
    // リクエストユーザーを特定
    const requestUser = await this.userService.fetchUserFromFirebaseUId(
      requestUId,
    );

    const messageCreate: ICreateMessage = {
      message: request.message,
      messageType: 'request',
    };

    try {
      // おゆずり元ユーザーをユーザーを識別してメッセージを投稿する
      const oyuzuriUser = await this.oyuzuriModel
        .findById(oyuzuriOwnerId)
        .exec();
      await this.messageSerivce.create(
        messageCreate,
        requestUser._id,
        oyuzuriUser._id,
        oyuzuriOwnerId,
      );

      // おゆずりスキーマをアップデート
      await this.oyuzuriModel.updateOne(
        { _id: oyuzuriOwnerId },
        {
          $push: {
            requestUsers: requestUser._id,
          },
        },
      );
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  /**
   * おゆずりをリクエストの承認確認する
   * @param oyuzuriOwnerId おゆずりオーナーID
   * @param requestUId リクエストユーザーのuId
   * @param message メッセージ
   */
  async confirm(
    oyuzuriOwnerId: string,
    requestUId: string,
    request: {
      message: string;
      targetUserId: string;
    },
  ): Promise<boolean> {
    // おゆずりを特定
    const oyuzuri = await this.oyuzuriModel.findById(oyuzuriOwnerId).exec();
    // リクエストユーザーを特定
    const requestUser = await this.userService.fetchUserFromFirebaseUId(
      requestUId,
    );

    if (requestUser._id.toString() !== oyuzuri.oyuzuriUserId.toString()) {
      throw new Error('リクエストユーザーが間違っています');
    }

    // ターゲットユーザーを特定
    const targetUser = await this.userService.fetchUserFromObjectId(
      request.targetUserId,
    );

    const messageCreate: ICreateMessage = {
      message: request.message,
      messageType: 'confirm',
    };

    try {
      // おゆずり元ユーザーをユーザーを識別してメッセージを投稿する
      await this.messageSerivce.create(
        messageCreate,
        targetUser._id,
        oyuzuri.oyuzuriUserId,
        oyuzuriOwnerId,
      );

      // おゆずりスキーマをアップデート
      await this.oyuzuriModel.updateOne(
        { _id: oyuzuriOwnerId },
        {
          oyuzuriTargetUserId: targetUser._id,
          status: 'confirm',
        },
      );
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  /**
   * おゆずりを承認する
   * @param oyuzuriOwnerId おゆずりオーナーID
   * @param requestUId リクエストユーザーのuId
   */
  async approve(oyuzuriOwnerId: string, requestUId: string) {
    try {
      // リクエストユーザーを特定
      const requestUser = await this.userService.fetchUserFromFirebaseUId(
        requestUId,
      );

      const oyuzuri = await this.oyuzuriModel
        .findOne({ _id: oyuzuriOwnerId })
        .exec();

      if (
        oyuzuri.oyuzuriTargetUserId.toString() !== requestUser._id.toString()
      ) {
        throw new Error('リクエストユーザーが間違っています');
      }

      const requestMessage = await this.messageSerivce.searchMessageByType(
        oyuzuri.oyuzuriTargetUserId,
        oyuzuri._id,
        'request',
      );

      const confirmMessage = await this.messageSerivce.searchMessageByType(
        oyuzuri.oyuzuriUserId,
        oyuzuri._id,
        'request',
      );

      // おゆずりコンテナを作成してこれまでのメッセージを格納
      const messageContainerCreater: IMessageCreate = {
        messageIds: [requestMessage._id, confirmMessage._id],
        oyuzuriId: oyuzuri._id,
      };

      const messageContainer = await this.messageContainerSerivce.create(
        messageContainerCreater,
      );

      // おゆずりスキーマをアップデート
      await this.oyuzuriModel.updateOne(
        { _id: oyuzuriOwnerId },
        {
          status: 'messaging',
          messageContainerId: messageContainer._id,
        },
      );
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  /**
   * おゆずりをキャンセルする
   * @param oyuzuriOwnerId おゆずりオーナーID
   * @param requestUId リクエストユーザーのuId
   */
  async cancel(oyuzuriOwnerId: string, requestUId: string): Promise<boolean> {
    // リクエストユーザーを特定
    const requestUser = await this.userService.fetchUserFromFirebaseUId(
      requestUId,
    );

    try {
      // おゆずりリクエストメッセージを削除
      await this.messageSerivce.delete(
        requestUser._id,
        oyuzuriOwnerId,
        'request',
      );

      // おゆずりスキーマを更新
      await this.oyuzuriModel.updateOne(
        { _id: oyuzuriOwnerId },
        {
          $pull: {
            requestUsers: requestUser._id,
          },
        },
      );
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }
}
