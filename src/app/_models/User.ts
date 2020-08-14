export class User {
  id: number;
  username: string;
  password: string;
  displayName: string;
  email: string;
  admin: boolean;
  jobTitleId: number;
  jobTitle: string;
  createdOn: Date;
  deactivatedOn?: Date;
}
