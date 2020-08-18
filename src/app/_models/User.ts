import { JobTitle } from "./JobTitle";

export class User {
  id?: number;
  username: string;
  password?: string;
  displayName: string;
  email: string;
  admin: boolean;
  jobTitle?: JobTitle;
  createdOn?: Date;
  deactivatedOn?: Date;
}
