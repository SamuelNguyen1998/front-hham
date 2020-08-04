import { RequiredValidator } from '@angular/forms';

export class Activity {
  id: number;
  projectId: number;
  name: string;
  description: string;
  lockedOn: Date;
  createdOn: Date;
  finishedOn: Date;
}
