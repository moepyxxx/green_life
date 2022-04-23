import { ObjectId } from "mongoose";

export interface IOyuzuriRequestUser {
  userId: ObjectId;
  displayName: string;
  thumbnailUrl: string;
  userName: string;
  message: string;
  createdAt: Date;
}