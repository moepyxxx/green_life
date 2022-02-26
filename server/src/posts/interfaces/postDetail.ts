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

  constructor(post: Post, tags: Tag[], user: User, greenPins: IGreenPin[]) {
    this._id = post._id;
    this.user = user;
    this.imagePath = post.imagePath;
    this.greenPins = greenPins;
    this.comment = post.comment;
    this.tags = tags;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}