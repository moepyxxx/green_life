import { IApiTag } from "./apiTag";
import { IApiUser } from "./apiUser";

export interface IApiPostDetail {
  _id: string;
  user: IApiUser;
  imagePath: string;
  comment: string;
  pins: {
    position: {
      left: string;
      top: string;
    },
    specieId: string;
  }[],
  tags: IApiTag[];
  createdAt: string;
  updatedAt: string;
}