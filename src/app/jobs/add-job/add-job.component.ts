import { Component, OnInit } from '@angular/core';
import { JobService } from "../../_services/job.service";

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
    job: {
      id: number;
      name: string;
      monthlyAmount: number;
    };
    submitted: boolean;

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
        this.submitted = true;
      }
    );
  }

  newJob(): void {
    this.submitted = false;
    this.job = {
      id: null,
      name: '',
      monthlyAmount: null
    };
  }

}
