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
  visibleActivities: Activity[];
  projectId: number;
  searchTerm = '';
  errorMessage = '';

  constructor(public auth: AuthService,
              private route: ActivatedRoute,
              private activityService: ActivityService) {
    this.projectId = this.route.snapshot.params.projectId;
  }

  ngOnInit(): void {
    this.retrieveActivities();
  }

  retrieveActivities(): void {
    this.activityService.getAllActivityOfUser(this.auth.user.id).subscribe(
      response => {
        this.activities = response.data;
        this.visibleActivities = this.activities;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  searchByName(): void {
    if (this.searchTerm === '') {
      this.visibleActivities = this.activities;
      return;
    }
    this.visibleActivities = this.activities.filter(
      activity => activity.name.indexOf(this.searchTerm) >= 0
    );
  }
}
