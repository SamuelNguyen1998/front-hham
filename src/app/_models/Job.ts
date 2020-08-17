import { NumberSymbol } from '@angular/common';

export interface Job {
  name: string;
  monthlyAmount: number;
  validFrom: Date;
  validTo?: Date;
}

