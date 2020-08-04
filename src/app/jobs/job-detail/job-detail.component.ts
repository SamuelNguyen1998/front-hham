import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/_services/job.service';


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  currentJob = null;

 

  message = '';
  jobForm: FormGroup= this.formBuilder.group({
    id: 'handle backend',
    name: 'handle backend', 
    amountMoney: 'handle backend',
  });

  constructor(private formBuilder: FormBuilder,
              private jobService: JobService, 
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {

  }
  getJob(id): void{
    return this.currentJob;

    // DO THIS LATER
    this.jobService.get(id).subscribe(
      response => {
        this.currentJob = response.data;

      }
    )
  }
  updateJob(): void{
    
  }
  onSubmit(){
    console.log(this.jobForm.value);
  }

}
