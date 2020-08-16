import { NumberSymbol } from '@angular/common';

export interface Job {
  id: NumberSymbol;
  name: string;
  monthlyAmount: number;
  validFrom: Date;
  validTo?: Date;
}

