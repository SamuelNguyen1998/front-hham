import { Component, OnInit } from '@angular/core';
import { JobService } from "../../_services/job.service";
import {Job} from '../../_models/Job';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
    job: Job;
     

  constructor(private jobService: JobService,
              private router: Router) { }

  ngOnInit(): void {
    this.newJob();
  }
  saveJob(): void {
    this.jobService.create(this.job).subscribe(
      response => {
        this.router.navigate(["jobs"]);
        console.log(response);
      }
    );
   // window.alert("You submitted successfully!")
  }

  newJob(): void {
    this.job = {
      id: null,
      name: '',
      monthlyAmount: null
    };
  }

}
