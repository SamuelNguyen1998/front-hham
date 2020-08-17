export class User {
  id?: number;
  username: string;
  password?: string;
  displayName: string;
  email: string;
  admin: boolean;
  jobTitle: string;
  createdOn?: Date;
  deactivatedOn?: Date;
}
