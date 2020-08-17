import { NumberSymbol } from '@angular/common';

export interface Job {


  id: number;

  name: string;
  monthlyAmount: number;
  validFrom: Date;
  validTo?: Date;
}

