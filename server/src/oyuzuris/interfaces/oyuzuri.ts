import { ObjectId } from 'mongoose';
import { TOyuzuriStatus } from './oyuzuriStatus';

export interface IOyuzuri {
  _id: ObjectId;
  oyuzuriComment: string;
  isPostMyself: boolean | null;
  status?: TOyuzuriStatus;

  oyuzuriRequestUsers?: {
    userId: ObjectId;
    thumbnailUrl: string;
    userName: string;
    displayName: string;
    message?: string;
    createdAt?: Date;
  }[];
  // statusが"confirm"の場合
  oyuzuriTargetUser?: {
    userId: ObjectId;
    displayName: string;
    thumbnailUrl: string;
    userName: string;
    message?: string;
    createdAt?: Date;
  };

  request?: {
    comment: string;
    createdAt: Date;
  };

  messageContainerId?: ObjectId;
  isRequest?: boolean;
  isTargetUser?: boolean;
  confirmMessage?: string | null;
  updatedAt?: Date;
}
