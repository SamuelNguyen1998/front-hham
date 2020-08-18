import { Fund } from "./Fund";
export class Project {
  id?: number;
  name: string;
  description: string;
  funds?: Fund[];
  createdOn?: Date;
  archivedOn?: Date;
}
