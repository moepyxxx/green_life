export interface IPost {
  userId: string;
  imagePath: string;
  comment: string;
  greenPins: {
    position: {
      left: number;
      top: number;
    },
    greenId: string;
  }[],
  tagIds: string[];
}