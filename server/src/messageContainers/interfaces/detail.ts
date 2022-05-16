import { ObjectId } from 'mongoose';

export type TMessageUser = 'you' | 'partner';

export interface IMessageSummary {
  id: ObjectId;
  user: TMessageUser;
  message: string;
  createdAt: Date;
}

export interface IDetail {
  _id: ObjectId;
  partner: {
    _id: ObjectId;
    imageUrl: string;
    displayName: string;
    userName: string;
  };
  messages: IMessageSummary[];
}
