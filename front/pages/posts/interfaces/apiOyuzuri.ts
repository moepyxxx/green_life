export type TOyuzuriStatus =
  | "wantedly"
  | "confirm"
  | "canceled"
  | "messaging"
  | "complete";

export interface IApiOyuzuri {
  _id: string;
  oyuzuriComment: string;
  isPostMyself: boolean | null;
  status?: TOyuzuriStatus;

  oyuzuriRequestUsers?: {
    userId: string;
    thumbnailUrl: string;
    userName: string;
    displayName: string;
    message?: string;
    createdAt?: Date;
  }[];
  // statusが"confirm"の場合
  oyuzuriTargetUser?: {
    userId: string;
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

  messageContainerId?: string;
  isRequest?: boolean;
  isTargetUser?: boolean;
  confirmMessage?: string | null;
  updatedAt?: Date;
}
