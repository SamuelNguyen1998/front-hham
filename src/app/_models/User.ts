import { JobTitle } from "./JobTitle";
import { Image } from "./Image";

export class User {
  id?: number;
  username: string;
  password?: string;
  displayName: string;
  email: string;
  admin: boolean;
  jobTitle?: JobTitle;
  image?: Image;
  createdOn?: Date;
  deactivatedOn?: Date;
}
