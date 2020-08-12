import { Component, OnInit } from '@angular/core';
import { Activity } from '../_models/Activity';
import { ActivityService } from '../_services/activity.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: [ './activities.component.scss' ]
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[];
  searchTerm: string;

  constructor(public auth: AuthService,
              private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.retrieveActivities();
  }

  retrieveActivities(): void {
    this.activityService.getAll().subscribe(
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
