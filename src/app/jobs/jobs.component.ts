import { Component, OnInit } from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import { Job} from '../_models/Job';
import { JobService} from '../_services/job.service';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: Job[];
  name: string;

  constructor(public auth: AuthService, 
              private jobService: JobService) { }

  ngOnInit(): void {
  }

  searchByName(): void {
    this.jobService.findByName(this.name).subscribe(
      response => this.jobs = response.data,
      error => console.log(error)
    );
  }

}
