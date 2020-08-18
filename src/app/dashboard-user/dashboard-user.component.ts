import { Component, Input, OnInit } from '@angular/core';

import { Activity } from "../_models/Activity";
import { ActivityService } from '../_services/activity.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: [ './dashboard-user.component.scss' ]
})
export class DashboardUserComponent implements OnInit {
  activities: Activity[];
  searchTerm: string;

  constructor(public auth: AuthService,
              private activityService: ActivityService) {
  }

  get activityHaveOpen(): Activity[] {
    return this.activities?.filter(activity => activity.archivedOn == null);
  }

  ngOnInit(): void {
    this.getActivityOfUser();
  }

  getActivityOfUser(): void {
    this.activityService.getAllActivityOfUser(this.auth.user.id).subscribe(
      response => this.activities = response.data,
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
