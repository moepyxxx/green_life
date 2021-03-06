import { IApiGreen } from "./apiGreen";
import { IApiTag } from "./apiTag";
import { IApiUser } from "./apiUser";

export interface IApiPostDetail {
  _id: string;
  user: IApiUser;
  imagePath: string;
  comment: string;
  greenPins: {
    position: {
      left: string;
      top: string;
    };
    green: IApiGreen;
  }[];
  tags: IApiTag[];
  createdAt: Date;
  updatedAt: Date;
  oyuzuriFlag: boolean;
  oyuzuriId: string | null;
}

export interface IApiOyuzuriRequestUser {
  userId: string;
  thumbnailUrl: string;
  userName: string;
  displayName: string;
  message?: string;
  createdAt?: Date;
}
