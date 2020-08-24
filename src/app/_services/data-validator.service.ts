import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataValidatorService {
  constructor() {
  }

  email(email: string): boolean {
    return /^[-\w.]+@[-\w]+(\.[-\w]+)*$/.test(email);
  }

  url(url: string): boolean {
    return /^(ftp|https?):\/\/.+$/.test(url);
  }

  nonEmpty(value: string): boolean {
    return value !== null && value !== undefined && value.length > 0;
  }

  username(username: string): boolean {
    return /^[\w.]+$/.test(username);
  }

  nonNegative(value: number): boolean {
    return this.atLeast(value, 0);
  }

  atLeast(value: number, min: number): boolean {
    return value !== null && value !== undefined && value >= min;
  }

  numberKeyPress(event: KeyboardEvent, valueString: string): void {
    // Decimal digits are accepted
    if (/\d/.test(event.key)) {
      return;
    }
    // Decimal point is allowed, but only once
    if (event.key === "." && valueString.indexOf(".") < 0) {
      return;
    }
    // All other keys are rejected
    event.preventDefault();
  }
}
