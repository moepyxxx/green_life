import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { MessageService } from 'src/messages/message.service';
import { ICreate as ICreateMessage } from 'src/messages/interfaces/create';
import { UserService } from 'src/users/user.service';
import { ICreate } from './interfaces/create';
import { Oyuzuri, OyuzuriDocument } from './oyuzuri.schema';

@Injectable()
export class OyuzuriService {
  constructor(
    @InjectModel(Oyuzuri.name) private oyuzuriModel: Model<OyuzuriDocument>,
    private readonly userService: UserService,
    private readonly messageSerivce: MessageService,
  ) {}

  async findByPostId(postId: Schema.Types.ObjectId): Promise<Oyuzuri> {
    return this.oyuzuriModel.findOne({ postId }).exec();
  }

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
