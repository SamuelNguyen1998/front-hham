import { Component, OnInit } from '@angular/core';
import { Activity } from '../_models/Activity';
import { ActivityService } from '../_services/activity.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activitys: Activity[];
  name: string;

  constructor(public auth: AuthService, private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  retrieveProjects(): void {
    this.activityService.getAll().subscribe(
      response => this.activitys = response.data,
      error => console.log(error)
    );
  }

  searchByName(): void {
    this.activityService.findByName(this.name).subscribe(
      data => this.activitys = data,
      error => console.log(error)
    );
  }
}
