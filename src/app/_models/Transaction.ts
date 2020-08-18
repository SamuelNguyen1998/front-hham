import { User } from './User';

export class Transaction {
  id: number;
  typeId: number;
  userId: number;
  user: User;
  projectId: number;
  activityId: number;
  amount: number;
  memo: string;
  createdOn: Date;
}
