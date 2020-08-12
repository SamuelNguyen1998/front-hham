import { Component, OnInit } from '@angular/core';
import { Job } from '../_models/Job';
import { JobService } from '../_services/job.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './job-titles.component.html',
  styleUrls: [ './job-titles.component.scss' ]
})
export class JobTitlesComponent implements OnInit {
  jobTitles: Job[];
  searchTerm: string;

  constructor(public auth: AuthService,
              private jobService: JobService) {
  }

  ngOnInit(): void {
    this.retrieveJobs();
  }

  retrieveJobs(): void {
    this.jobService.getAll().subscribe(
      response => this.jobTitles = response.data,
      console.log
    );
  }

  searchByName(): void {
    this.jobService.findByName(this.searchTerm).subscribe(
      response => this.jobTitles = response.data,
      console.log
    );
  }
}
