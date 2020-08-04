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
      amountMoney: number;
    };
    submitted = false;

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
  }
  saveJob(): void {
    const { name, amountMoney } = this.job;
    this.jobService.create({ name, amountMoney}).subscribe(
      response => this.submitted = true,
      error => console.log(error));
  }

  newJob(): void {
    this.submitted = false;
    this.job = {
      id: 0,
      name: '',
      amountMoney: 0
    };
  }

}
