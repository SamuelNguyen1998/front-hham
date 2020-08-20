import { Fund } from "./Fund";
import { Image } from "./Image";

export class Project {
  id?: number;
  name: string;
  description: string;
  funds?: Fund[];
  image?: Image;
  createdOn?: Date;
  archivedOn?: Date;
}
