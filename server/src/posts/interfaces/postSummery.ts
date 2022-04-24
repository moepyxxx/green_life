import { ObjectId } from 'mongoose';
import { Post } from '../post.schema';

export interface IPostSummary {
  _id: ObjectId;
  imagePath: string;
}

export class PostSummaryMaker implements IPostSummary {
  _id: ObjectId;
  imagePath: string;

  constructor(post: Post) {
    this._id = post._id;
    this.imagePath = post.imagePath;
  }
}
