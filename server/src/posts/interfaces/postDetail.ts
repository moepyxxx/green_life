import { IGreenPin } from "./greenPin";
import { Tag } from "src/tags/tag.schema";
import { Post } from "../post.schema";
import { ObjectId, Schema } from "mongoose";
import { User } from "src/users/user.schema";
import { Oyuzuri } from "src/oyuzuris/oyuzuri.schema";
import { IOyuzuriRequestUser } from "./oyuzuriRequestUser";

export interface IPostDetail {
  _id: ObjectId;
  user: User;
  imagePath: string;
  greenPins: IGreenPin[];
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  oyuzuriFlag: boolean;
  isPostMyself: boolean;
  oyuzuriComment: string | null;
  oyuzuriId: ObjectId | null;
  oyuzuriRequestUsers: IOyuzuriRequestUser[] | null;
  oyuzuriRequest: boolean | null;
}

export class PostDetailMaker implements IPostDetail {

  _id: ObjectId;
  user: User;
  imagePath: string;
  greenPins: IGreenPin[];
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  oyuzuriFlag: boolean;
  isPostMyself: boolean;
  oyuzuriComment: string | null;
  oyuzuriId: ObjectId | null;
  oyuzuriRequestUsers: IOyuzuriRequestUser[] | null;
  oyuzuriRequest: boolean | null;

  constructor(
    post: Post,
    tags: Tag[],
    user: User,
    greenPins: IGreenPin[],
    oyuzuri: Oyuzuri | null,
    accessUser: User | null,
    requestUsers: IOyuzuriRequestUser[],
    requestUid: string | false
  ) {
    this._id = post._id;
    this.user = user;
    this.imagePath = post.imagePath;
    this.greenPins = greenPins;
    this.comment = post.comment;
    this.tags = tags;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.isPostMyself = this.checkIsPostMySelf(user.firebaseUid, requestUid);

    this.oyuzuriFlag = oyuzuri !== null;
    this.oyuzuriId = oyuzuri ? oyuzuri._id : null;
    this.oyuzuriComment = oyuzuri ? oyuzuri.oyuzuriComment : null;

    // 以下モック
    if (this.isPostMyself) {
      // 返却
      this.oyuzuriRequestUsers = oyuzuri ? requestUsers : null;

      // 自分の投稿ではないので返却しない
      this.oyuzuriRequest = null;
    } else {

      // 自分の投稿ではないので返却しない
      this.oyuzuriRequestUsers = null;

      // 返却
      this.oyuzuriRequest = oyuzuri.requestUsers.includes(accessUser._id);
    }
  }

  checkIsPostMySelf(postUid: string, requestUid: string | false) {
    if (!requestUid) {
      return false;
    }
    return postUid === requestUid;
  }
}