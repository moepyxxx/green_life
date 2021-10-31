import { IPin } from "./pin";
import { IPostLike } from "./postLike";
import { ITag } from "./tag";
import { IUser } from "./user";

export interface IPostDetail {
  id: string;
  user: IUser;
  image_path: string; // hash
  pins: IPin[];
  comment: string;
  like: IPostLike;
  created_at: Date;
  updated_at: Date;
  tags: ITag[];
}