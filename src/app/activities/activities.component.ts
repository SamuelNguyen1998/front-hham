import { Component, OnInit } from '@angular/core';
import { Activity } from '../_models/Activity';
import { AuthService } from '../_services/auth.service';
import { ActivityService } from '../_services/activity.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: [ './activities.component.scss' ]
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[];
  activitiesOfUser: Activity[];
  searchTerm: string;

  constructor(public auth: AuthService,
              private route: ActivatedRoute,
              private activityService: ActivityService) {}

  ngOnInit(): void {
    this.retrieveActivities();
    this.getActivityOfUser()
  }

  retrieveActivities(): void {
    this.activityService.getAll().subscribe(
      response => this.activities = response.data,
      console.log
    );
  }

  getActivityOfUser(): void {
    this.activityService.getAllActivityOfUser(this.auth.user.id).subscribe(
      response => this.activitiesOfUser = response.data,
      console.log
    );
  }

  searchByName(): void {
    this.activityService.findByName(this.searchTerm).subscribe(
      data => this.activities = data,
      console.log
    );
  }
}
