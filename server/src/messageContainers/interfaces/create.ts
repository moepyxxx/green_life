import { ObjectId } from 'mongoose';

export interface ICreate {
  messageIds: ObjectId[];
  oyuzuriId: ObjectId;
  userIds: ObjectId[];
}
