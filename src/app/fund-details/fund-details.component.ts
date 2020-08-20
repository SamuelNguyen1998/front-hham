import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../_models/User';
import { Project } from '../_models/Project';
import { Activity } from '../_models/Activity';
import { JobTitle } from '../_models/JobTitle';
import { Transaction } from '../_models/Transaction';
import { AuthService } from '../_services/auth.service';
import { FundService } from '../_services/fund.service';
import { ProjectService } from '../_services/project.service';
import { ActivityService } from '../_services/activity.service';


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
  sum = 0;
  type = 1;

  constructor(public auth: AuthService,
              private projectService: ProjectService,
              private activityService: ActivityService,
              private route: ActivatedRoute,
              private transactionService: FundService) {
  }

  ngOnInit(): void {
    this.loadProject();
  }

  loadProject(): void {
    this.projectService.get(this.route.snapshot.params.id).subscribe(
      response => {
        this.currentProject = response.data;
        this.loadActivities();
        this.loadMembers();
        this.loadTransaction();
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
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
      response =>{ this.members = response.data;
      errorResponse => this.errorMessage = errorResponse.error.message;
      console.log(response);
      }

    );
      
  }

  loadTransaction(): void {
    this.transactionService.getTransaction(this.currentProject.id).subscribe(
      response => this.transactions = response.data,
      errorResponse => this.errorMessage = errorResponse.error.messsage
    );
  }

  saveTransaction(): void {
    const inputElems = document.getElementsByTagName("input");
    for (let i = 0; i < inputElems.length; i++) {
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
        const data = {
          userId: Number(inputElems[i].getAttribute("id")),
          fundId: this.currentProject.funds[0].id,
          amount: Number(inputElems[i].getAttribute("value")),
          typeId: 1,
          memo: "Funding"
        };
        this.sum += data.amount;
        this.transactionService.create(data).subscribe(
          response => this.loadProject(),
          errorResponse => this.errorMessage = errorResponse.error.message
        );
      }
    }
    const data = {
      id: this.currentProject.funds[0].id,
      amount: this.sum,
    };
    this.transactionService.calc(this.type, data).subscribe(
      response => this.loadProject(),
      errorResponse => this.errorMessage = errorResponse.error.message
    );
    this.sum = 0;
  }

  remind(): void {
    const inputElems = document.getElementsByTagName("input");
    for (let i = 0; i < inputElems.length; i++) {
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
        const data = {
          userId: Number(inputElems[i].getAttribute("id")),
          projectId: this.currentProject.id,
          amount: Number(inputElems[i].getAttribute("value")),
          typeId: 1
        };
        this.transactionService.remind(data).subscribe(
          response => console.log(response),
          errorResponse => this.errorMessage = errorResponse.error.message
        );
      }
    }
    this.loadTransaction();
  }
}
