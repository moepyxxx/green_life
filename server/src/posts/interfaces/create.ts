import { IGreenPin } from "./greenPin";
import { Tag } from "src/tags/tag.schema";
import { ObjectId } from "mongoose";
import { User } from "src/users/user.schema";

export interface ICreate {
  user: User;
  imagePath: string;
  greenPins: IGreenPin[];
  comment: string;
  tags: Tag[];
}