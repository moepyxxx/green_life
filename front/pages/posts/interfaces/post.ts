export interface IPost {
  imagePath: string;
  comment: string;
  greenPins: IGreenPin[],
  tagIds: string[];
  oyuzuriFlag: boolean;
  oyuzuriComment: string;
}

export interface IGreenPin {
  position: IPosition,
  greenId: string;
}

export interface IPosition {
  left: number;
  top: number;
}