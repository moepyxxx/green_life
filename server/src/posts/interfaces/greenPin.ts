import { Green } from 'src/greens/green.schema';
import { IPosition } from './position';

export interface IGreenPin {
  position: IPosition;
  green: Green;
}
