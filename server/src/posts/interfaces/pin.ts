import { Green } from "src/greens/green.schema";
import { IPosition } from "./position";

export interface IPin {
  position: IPosition;
  green: Green;
}