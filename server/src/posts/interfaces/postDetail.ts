import { IPin } from "./pin";
import { ITag } from "../../tags/interfaces/tag";
import { IUser } from "../../users/interfaces/user";

export interface IPostDetail {
  id: string;
  user: IUser;
  imagePath: string;
  pins: IPin[];
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  tags: ITag[];
}