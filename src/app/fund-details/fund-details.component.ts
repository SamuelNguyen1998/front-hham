import { Component, OnInit } from '@angular/core';
import { Project } from '../_models/Project';
import { Activity } from '../_models/Activity';
import { User } from '../_models/User';
import { Transaction } from '../_models/Transaction';
import { ProjectService } from '../_services/project.service';
import { ActivityService } from '../_services/activity.service';
import { FundService } from 'src/app/_services/fund.service'
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { JobTitleService } from "../_services/job-title.service";
import { JobTitle } from '../_models/JobTitle';


@Component({
  selector: 'app-fund-details',
  templateUrl: './fund-details.component.html',
  styleUrls: [ './fund-details.component.scss' ]
})
export class FundDetailsComponent implements OnInit {
  currentProject: Project;
  
  activities: Activity[];
  activity: Activity;
  members: User[];
  jobTitles: JobTitle[];
  transaction: Transaction;
  transactions: Transaction[];
  errorMessage = '';

  constructor(private projectService: ProjectService,
              private activityService: ActivityService,
              private route: ActivatedRoute,
              private transactionService: FundService,
              private router: Router,
              private jobTitleService: JobTitleService) { }


  ngOnInit(): void {
    this.projectService.get(this.route.snapshot.params.id).subscribe(
      response => {
        this.currentProject = response.data;
        this.loadActivities();
        this.loadMembers();
        this.loadTransaction();
 
       
      }  
    )
  }

  loadActivities(): void {
    this.activityService.findAllInProject(this.currentProject.id).subscribe(
      response => {
        this.activities = response.data;
      }
    );

  }

  loadMembers(): void {
    this.projectService.getMembers(this.currentProject.id).subscribe(
      response => this.members = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message,
    );
  }


  loadTransaction(): void{

    this.transactionService.getTransaction(this.currentProject.id).subscribe(
      response => {
        this.transactions = response.data;
        console.log(response);
      },
      error => console.log(error)
    );
  }

  saveTransaction(): void {
    var inputElems = document.getElementsByTagName("input");
    for (var i = 0; i < inputElems.length; i++) {
    
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
        const data = {
          userId: Number(inputElems[i].getAttribute("id")),
          fundId: this.currentProject.funds[0].id,
          amount: Number(inputElems[i].getAttribute("value")),
          typeId: 1
        };
        this.transactionService.create(data).subscribe(
          response => {
            this.router.navigate([`/funds/${this.currentProject.id}`]);

          },
        );
      }

    }
    window.location.reload();
  }

  remind(): void {
    var inputElems = document.getElementsByTagName("input");
    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
        const data = {
          userId: Number(inputElems[i].getAttribute("id")),
          projectId: this.currentProject.id,
          amount: Number(inputElems[i].getAttribute("value")),
          typeId: 1
        };
        this.transactionService.remind(data).subscribe(
          response => {
            console.log(response);

          },
        );
      }
    }
    window.location.reload();
  }
}
