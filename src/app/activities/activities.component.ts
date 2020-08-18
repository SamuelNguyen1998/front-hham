import { Component, OnInit } from '@angular/core';
import { Project } from '../_models/Project';
import { Activity } from '../_models/Activity';
import { AuthService } from '../_services/auth.service';
import { ProjectService } from '../_services/project.service';
import { ActivityService } from '../_services/activity.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: [ './activities.component.scss' ]
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[];
  projects: Project[];
  searchTerm: string;
  projectId: number;

  constructor(public auth: AuthService,
              private route: ActivatedRoute,
              private activityService: ActivityService,
              private projectService: ProjectService) {
    this.projectId = this.route.snapshot.params.projectId;
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

  getActivityOfUser(): void {
    this.projectService.getAllProjectOfUser(this.auth.user.id).subscribe(
      response => this.projects = response.data,
    );
    for (const p of this.projects) {
      this.activityService.findAllInProject(p.id).subscribe(
        response => this.activities = response.data,
      );
    }
  }

  searchByName(): void {
    this.activityService.findByName(this.searchTerm).subscribe(
      data => this.activities = data,
      console.log
    );
  }
}
