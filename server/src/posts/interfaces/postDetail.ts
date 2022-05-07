import { IGreenPin } from './greenPin';
import { Tag } from 'src/tags/tag.schema';
import { Post } from '../post.schema';
import { ObjectId } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Oyuzuri } from 'src/oyuzuris/oyuzuri.schema';
import { IOyuzuriRequestUser } from './oyuzuriRequestUser';

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
  oyuzuriId: ObjectId | null;
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
  oyuzuriId: ObjectId | null;

  constructor(
    post: Post,
    tags: Tag[],
    user: User,
    greenPins: IGreenPin[],
    oyuzuri: Oyuzuri | null,
  ) {
    this._id = post._id;
    this.user = user;
    this.imagePath = post.imagePath;
    this.greenPins = greenPins;
    this.comment = post.comment;
    this.tags = tags;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;

    this.oyuzuriFlag = oyuzuri !== null;
    this.oyuzuriId = oyuzuri ? oyuzuri._id : null;
  }
}
