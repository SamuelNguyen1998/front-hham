import { Component, OnInit } from '@angular/core';
import { Job } from '../_models/Job';
import { JobService } from '../_services/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job-title',
  templateUrl: './add-job-title.component.html',
  styleUrls: [ './add-job-title.component.scss' ]
})
export class AddJobTitleComponent implements OnInit {
  job: Job = {
    id: 0,
    name: '',
    monthlyAmount: 0,
    validFrom: undefined,
  };
  errorMessage = '';
  jobTouched = false;

  constructor(private jobService: JobService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  create(): void {
    this.jobService.create(this.job).subscribe(
      response => {
        // TODO: Add flash message to notify about successful operation
        this.router.navigate([ `/jobs` ]);
      },
      error => {
        this.errorMessage = '';
        console.log(error);
      }
    );
  }

  reset(): void {
    this.errorMessage = '';
    this.jobTouched = false;
    this.job = {
      id: 0,
      name: '',
      monthlyAmount: 0,
      validFrom: undefined,
    };
  }

  isValidName(): boolean {
    return this.job.name.length > 0;
  }
}
