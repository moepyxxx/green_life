import { IPin } from "./pin";
import { IPostLike } from "./postLike";
import { ITag } from "./tag";
import { IUser } from "./user";

export interface IPostDetail {
  id: string;
  user: IUser;
  imagePath: string; // hash
  pins: IPin[];
  comment: string;
  like: IPostLike;
  createdAt: Date;
  updatedAt: Date;
  tags: ITag[];
}