import { IUser } from "./user";

export interface IPostLike {
  id: string; // hash
  user: IUser;
}