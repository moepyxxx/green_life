export interface IPost {
  userId: string;
  imagePath: string;
  comment: string;
  greenPins: IGreenPin[],
  tagIds: string[];
}

export interface IGreenPin {
  position: IPosition,
  greenId: string;
}

export interface IPosition {
  left: number;
  top: number;
}