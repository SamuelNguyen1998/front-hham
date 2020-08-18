import { Component, Input, OnInit } from '@angular/core';
import { Activity } from "../_models/Activity";
import { OptionService } from "../_services/option.service";
import { UserService } from "../_services/user.service";
import { ActivityService } from '../_services/activity.service';
import { Project } from '../_models/Project';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../_services/project.service';


@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: [ './dashboard-user.component.scss' ]
})
export class DashboardUserComponent implements OnInit {
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
    console.log(this.activities);
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
