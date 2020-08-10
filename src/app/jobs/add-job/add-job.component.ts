import { Component, OnInit } from '@angular/core';
import { JobService } from "../../_services/job.service";
import {Job} from '../../_models/Job';
@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
    job: Job;
     

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.newJob();
  }
  saveJob(): void {
    const { id, name, monthlyAmount } = this.job;
    const data = {
      id: id,
      name: name, 
      monthlyAmount: monthlyAmount,
    };
    this.jobService.create(data).subscribe(
      response => {
        console.log(response);
      }
    );
    window.alert("You submitted successfully!")
  }

  newJob(): void {
    this.job = {
      id: null,
      name: '',
      monthlyAmount: null
    };
  }

}
