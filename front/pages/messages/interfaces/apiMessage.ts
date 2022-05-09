import { TOyuzuriStatus } from "../../posts/interfaces/apiOyuzuri";

export interface IApiMessageContainer {
  _id: string;
  lastUpdatedAt: string;
  isNew: boolean;
  message: string;
  partner: {
    _id: string;
    imageUrl: string;
    userName: string;
  };
}
