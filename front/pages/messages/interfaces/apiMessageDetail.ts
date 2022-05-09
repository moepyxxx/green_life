export type TMessageUser = "you" | "partner";

export interface IMessageSummary {
  id: string;
  user: TMessageUser;
  message: string;
  createdAt: Date;
}

export interface IApiMessageContainerDetail {
  _id: string;
  partner: {
    _id: string;
    imageUrl: string;
    userName: string;
  };
  messages: IMessageSummary[];
}
