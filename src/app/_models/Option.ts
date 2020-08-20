import { Image } from "./Image";

export class Option {
  id?: number;
  activityId: number;
  name: string;
  price: number;
  image?: Image;
  createdOn?: Date;
}
