import { IGreenPin } from "./greenPin";
import { Tag } from "src/tags/tag.schema";
import { Post } from "../post.schema";
import { ObjectId } from "mongoose";
import { User } from "src/users/user.schema";

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
  oyuzuriRequestUsers: {
    _id: string;
    imageUrl: string;
    userName: string;
  }[] | null;
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
  oyuzuriRequestUsers: {
    _id: string;
    imageUrl: string;
    userName: string;
  }[] | null;
  oyuzuriRequest: boolean | null;

  constructor(post: Post, tags: Tag[], user: User, greenPins: IGreenPin[], requestUid: string | false) {
    this._id = post._id;
    this.user = user;
    this.imagePath = post.imagePath;
    this.greenPins = greenPins;
    this.comment = post.comment;
    this.tags = tags;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.oyuzuriComment = post.oyuzuriComment;
    this.oyuzuriFlag = post.oyuzuriFlag;
    this.isPostMyself = this.checkIsPostMySelf(user.firebaseUid, requestUid);

    // 以下モック
    if (this.isPostMyself) {
      // 返却
      this.oyuzuriId = post._id;
      this.oyuzuriRequestUsers = [];

      // 自分の投稿ではないので返却しない
      this.oyuzuriRequest = null;
    } else {

      // 自分の投稿ではないので返却しない
      this.oyuzuriId = null;
      this.oyuzuriRequestUsers = null;

      // 返却
      this.oyuzuriRequest = false;
    }
  }

  checkIsPostMySelf(postUid: string, requestUid: string | false) {
    if (!requestUid) {
      return false;
    }
    return postUid === requestUid;
  }
}