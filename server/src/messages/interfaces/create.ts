import { MessageType } from "../message.schema";

export interface ICreate {
  message: string;
  messageType: MessageType;
}