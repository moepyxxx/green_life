import { ObjectId } from 'mongoose';

export interface ICreate {
  messageIds: ObjectId[];
  oyuzuriId: ObjectId;
  users: {
    owner: ObjectId;
    partner: ObjectId;
  };
}
