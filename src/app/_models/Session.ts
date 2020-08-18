export interface Session {
  userId: number;
  token: string;
  createdOn: Date;
  expiredOn: Date;
}
