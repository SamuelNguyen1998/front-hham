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
    monthlyAmount: 'handle backend',
  });

  constructor(private formBuilder: FormBuilder,
              private jobService: JobService, 
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {
    this.message = '';
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
        this.message = 'Job title was updated sucessfully!'
      }
    )
    
  }
  onSubmit(){
    console.log(this.jobForm.value);
  }

  // delete title job
  deleteJob(): void{
    this.jobService.delete(this.currentJob.id).subscribe(
      response => {
      this.router.navigate(['./jobs']);
      }
    );
  }

}
