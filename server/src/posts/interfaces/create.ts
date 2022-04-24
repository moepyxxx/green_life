import { IGreenPin } from './greenPin';
import { Tag } from 'src/tags/tag.schema';

export interface ICreate {
  imagePath: string;
  greenPins: IGreenPin[];
  comment: string;
  tags: Tag[];
  oyuzuriFlag: boolean;
  oyuzuriComment: string;
}
