import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../_services/project.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Activity } from "../../_models/Activity";
import { ActivityService } from "../../_services/activity.service";
import { Project } from "../../_models/Project";
import { UserService } from 'src/app/_services/user.service';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-detailed-project',
  templateUrl: './detailed-project.component.html',
  styleUrls: [ './detailed-project.component.scss' ]
})
export class DetailedProjectComponent implements OnInit {
  currentProject: Project;
  activities: Activity[];
  members: any;
  message = "";
  allMembers: any;
  selectControl = new FormControl('1');

  constructor(public auth: AuthService,
              private projectService: ProjectService,
              private activityService: ActivityService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.message = '';
    this.projectService.get(this.route.snapshot.params.id).subscribe(
      response => {
        this.currentProject = response.data;
        this.loadActivities();
        this.loadMembers();
        this.loadAllMembers();
      },
      error => console.log(error)
    );
  }

  updateProject(): void {
    this.projectService.update(this.currentProject.id, this.currentProject).subscribe(
      response => this.message = 'The project was updated successfully!',
      error => console.log(error)
    );
  }

  deleteProject(): void {
    this.projectService.delete(this.currentProject.id).subscribe(
      response => this.router.navigate([ '/projects' ]),
      error => console.log(error));
  }
  loadActivities(): void {
    this.activityService
      .findAllInProject(this.currentProject.id)
      .subscribe(response => this.activities = response.data);
  }
  loadMembers(): void {
    this.projectService.getMember(this.currentProject.id)
      .subscribe(
        response => {
          this.members = response.data;
        },
        error => console.log(error),
      );
  }
  loadAllMembers(): void {
    this.userService.getAll()
      .subscribe(
        response => {
          this.allMembers = response.data;
        },
        error => console.log(error),
      );
  }
  addMember(member: any): void {
    this.projectService.addMember(this.currentProject.id,member)
      .subscribe(
        response => {
        this.message = 'The Member was added successfully!';
        window.location.reload();
      },
        error => console.log(error),
      );
  }
  removeMember(idMember: any): void {
    this.projectService.removeMember(this.currentProject.id,idMember).subscribe(
      response => {
      this.message = 'The Member was removed successfully!';
      window.location.reload();
      },
      error => console.log(error));
  }
}
