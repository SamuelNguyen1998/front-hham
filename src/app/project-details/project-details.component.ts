import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../_models/Project';
import { Activity } from '../_models/Activity';
import { ProjectService } from '../_services/project.service';
import { ActivityService } from '../_services/activity.service';
import { User } from "../_models/User";
import { UserService } from "../_services/user.service";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: [ './project-details.component.scss' ]
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  newProject: Project;
  activities: Activity[];
  members: User[];
  successMessage = '';
  errorMessage = '';
  isMemberListExpanded = false;
  isActivityListExpanded = false;
  isInEditMode = false;

  constructor(private projectService: ProjectService,
              private activityService: ActivityService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadProject();
    // TODO: Only load members of this project instead of all users in the system
    this.loadMembers();
  }

  loadProject(): void {
    this.projectService.get(this.route.snapshot.params.id).subscribe(
      response => {
        this.project = response.data;
        this.loadActivities();
      },
      error => {
        this.errorMessage = 'Failed loading projects';
        console.log(error);
      }
    );
  }

  loadActivities(): void {
    this.activityService.findAllInProject(this.project.id).subscribe(
      response => this.activities = response.data,
      error => {
        this.errorMessage = 'Failed loading activities related to this project';
        console.log(error);
      }
    );
  }

  loadMembers(): void {
    this.userService.getAll().subscribe(
      response => this.members = response.data,
      error => console.log(error),
    );
  }

  addMember(id: number): void {
    this.projectService.addMember(this.project.id, id).subscribe(
      response => {
        this.successMessage = 'The Member was added successfully!';
        // this.members.push(response.data);
      },
      error => console.log(error),
    );
  }

  removeMember(id: number): void {
    this.projectService.removeMember(this.project.id, id).subscribe(
      response => {
        this.successMessage = 'The Member was removed successfully!';
        this.members = this.members.filter(member => member.id === id);
      },
      error => console.log(error)
    );
  }


  archive(): void {
    this.projectService.delete(this.project.id).subscribe(
      () => this.router.navigate([ '/projects' ]),
      error => {
        this.errorMessage = 'Archival failed';
        console.log(error);
      }
    );
  }


  enterEditMode(): void {
    this.newProject = { ...this.project };
    this.isInEditMode = true;
  }

  saveEdit(): void {
    this.projectService.update(this.project.id, this.newProject).subscribe(
      () => {
        this.successMessage = 'Successfully updated project information';
        this.project = this.newProject;
      },
      error => {
        this.errorMessage = 'Update failed';
        console.log(error);
      }
    );
    this.isInEditMode = false;
  }

  cancelEdit(): void {
    this.isInEditMode = false;
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }

  clearSuccessMessage(): void {
    this.successMessage = '';
  }

  updateMemberListState(): void {
    // Click events are fired before the state change, so we need to
    // check for the absence of the class 'show' instead of its presence
    const classes = document.getElementById('memberList').classList;
    this.isMemberListExpanded = !classes.contains('show');
  }

  updateActivityListState(): void {
    const classes = document.getElementById('activityList').classList;
    this.isActivityListExpanded = !classes.contains('show');
  }
}
