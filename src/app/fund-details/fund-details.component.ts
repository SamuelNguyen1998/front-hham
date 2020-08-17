import { Component, OnInit } from '@angular/core';
import { Project } from '../_models/Project';
import { Activity } from '../_models/Activity';
import { User } from '../_models/User';
import { Transaction } from '../_models/Transaction';
import { ProjectService } from '../_services/project.service';
import { ActivityService } from '../_services/activity.service';
import { FundService } from 'src/app/_services/fund.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-fund-details',
  templateUrl: './fund-details.component.html',
  styleUrls: ['./fund-details.component.scss']
})
export class FundDetailsComponent implements OnInit {
  currentProject: Project;
  activities: Activity[];
  activity: Activity;
  members: User[];
  transaction: Transaction;
  transactions: Transaction[];

  constructor(private projectService: ProjectService,
              private activityService: ActivityService, 
              private route: ActivatedRoute,
              private transactionService: FundService) { }

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
  loadActivities(): void{
    this.activityService.findAllInProject(this.currentProject.id).subscribe(
      response => {
        this.activities = response.data;
      }
    );
    
  }
  loadMembers(): void{
    this.projectService.getMember(this.currentProject.id).subscribe(
      response => {
        this.members = response.data;
      }
    )
  }
  loadTransaction(): void{
    this.transactionService.getTransaction(this.currentProject.id).subscribe(
      response => {
        this.transactions = response.data;
      },
      error => console.log(error)
    );
  } 

  saveTransaction(): void{
    var inputElems = document.getElementsByTagName("input");
    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
        const data = {
          userId: Number(inputElems[i].getAttribute("id")),
          projectId: this.currentProject.id,
          amount: Number(inputElems[i].getAttribute("value")),
          typeId: 1
        };
        this.transactionService.create(data).subscribe(
          response => {
            console.log(response);
            
          },
        );
      }
    }
    window.location.reload();
  }
  remind(): void{
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


  typeOf(value){
    return typeof value;
  }
}