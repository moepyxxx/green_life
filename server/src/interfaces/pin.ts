import { IGreen } from "./green";
import { IPosition } from "./position";

export interface IPin {
  id: string; // hash
  position: IPosition;
  green: IGreen;
}