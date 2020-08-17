import { Component, OnInit } from '@angular/core';
import { Job } from '../_models/Job';
import { flatMap } from 'rxjs/operators';
import { JobService } from '../_services/job.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-title-details',
  templateUrl: './job-title-details.component.html',
  styleUrls: ['./job-title-details.component.scss']
})
export class JobTitleDetailsComponent implements OnInit {

  currentJob: any;

  jobTouched = {
    name: false,
    monthlyAmount: false,
  };

  constructor(  private jobService: JobService,
                private route: ActivatedRoute) 
                { }

  ngOnInit(): void {
    this.getJob(this.route.snapshot.paramMap.get('id'));
  }
  getJob(id): void{
    
    this.jobService.get(id).subscribe(
      response => {
        this.currentJob = response.data;
      });
  }
  updateJob(): void{
    this.jobService.update(this.currentJob.id, this.currentJob).subscribe(
      response => {
      }
    )
    
  }
}
