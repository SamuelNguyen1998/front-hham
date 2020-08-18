import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JobTitle } from "../_models/JobTitle";
import { JobTitleService } from '../_services/job-title.service';

@Component({
  selector: 'app-add-job-title',
  templateUrl: './add-job-title.component.html',
  styleUrls: [ './add-job-title.component.scss' ]
})
export class AddJobTitleComponent implements OnInit {
  jobTitle: JobTitle = {
    name: '',
    monthlyAmount: 0,
  };
  errorMessage = '';
  touched = { name: false, amount: false };

  constructor(private jobTitleService: JobTitleService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  create(): void {
    this.touched = { amount: true, name: true };
    if (!this.isValidName() || !this.isValidAmount()) {
      return;
    }
    this.jobTitleService.create(this.jobTitle).subscribe(
      response => {
        // TODO: Add flash message to notify about successful operation
        this.router.navigate([ '/jobs' ]);
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  reset(): void {
    this.errorMessage = '';
    this.touched = { name: false, amount: false };
    this.jobTitle = { name: '', monthlyAmount: 0 };
  }

  isValidName(): boolean {
    return this.jobTitle.name.length > 0;
  }

  keyPressOnAmount(event: KeyboardEvent): void {
    // Decimal digits are accepted
    if (/\d/.test(event.key)) {
      return;
    }
    // Decimal point is allowed, but only once
    const amountStr = this.jobTitle.monthlyAmount.toString();
    if (event.key === "." && amountStr.indexOf(".") < 0) {
      return;
    }
    // All other keys are rejected
    event.preventDefault();
  }

  isValidAmount(): boolean {
    return this.jobTitle.monthlyAmount >= 0;
  }
}
