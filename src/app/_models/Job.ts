export interface Job {
  name: string;
  monthlyAmount: number;
  validFrom: Date;
  validTo?: Date;
}

