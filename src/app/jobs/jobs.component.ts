import { Component, OnInit } from '@angular/core';
import { Job } from '../_models/Job';
import { JobService } from '../_services/job.service';
import { AuthService } from '../_services/auth.service';

// fake for view
import { JOBS} from '../jobs/fakedata_jobs';


// for search
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: [ './jobs.component.scss' ]
})


export class JobsComponent implements OnInit {
  //jobs = JOBS;
  jobs: Job[];
  name: string;

  constructor(public auth: AuthService,
              private jobService: JobService) {
                
              }
  
  ngOnInit(): void {
    this.retriveJobs();
  }
  // for access data from db
  retriveJobs(): void{
    this.jobService.getAll().subscribe(
      response => this.jobs = response.data
    );
  }

  // using button to search
  searchByName(): void {
    this.jobService.findByName(this.name).subscribe(
      response => this.jobs = response.data,
    );
  }
}
