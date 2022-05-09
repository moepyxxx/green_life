import { ObjectId } from 'mongoose';

export interface ISummaryResult {
  _id: ObjectId;
  lastUpdatedAt: Date;
  isNew: boolean;
  message: string;
  partner: {
    _id: ObjectId;
    imageUrl: string;
    userName: string;
  };
}
