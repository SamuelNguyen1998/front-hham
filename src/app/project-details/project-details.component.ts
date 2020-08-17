import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../_models/Project';
import { Activity } from '../_models/Activity';
import { ProjectService } from '../_services/project.service';
import { ActivityService } from '../_services/activity.service';
import { User } from "../_models/User";
import { UserService } from "../_services/user.service";
import { AuthService } from '../_services/auth.service';

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
  allMembers: User[];
  successMessage = '';
  errorMessage = '';
  isMemberListExpanded = false;
  isActivityListExpanded = false;
  isInEditMode = false;
  id = this.route.snapshot.params.id;

  constructor(public auth: AuthService,
              private projectService: ProjectService,
              private activityService: ActivityService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadAllMembers();
    this.loadProject();
    this.loadMembers();
  }

  loadProject(): void {
    this.projectService.get(this.id).subscribe(
      response => {
        this.project = response.data;
        this.loadActivities();
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  loadActivities(): void {
    this.activityService.findAllInProject(this.id).subscribe(
      response => this.activities = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  loadMembers(): void {
    this.projectService.getMember(this.id).subscribe(
      response => this.members = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message,
    );
  }

  loadAllMembers(): void {
    this.userService.getAll().subscribe(
      response => this.allMembers = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message,
    );
  }

  addMember(id: number): void {
    this.projectService.addMember(this.project.id, id).subscribe(
      response => {
        this.successMessage = 'The Member was added successfully!';
        this.loadMembers();
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  removeMember(id: number): void {
    this.projectService.removeMember(this.project.id, id).subscribe(
      response => {
        this.successMessage = 'The Member was removed successfully!';
        this.members = this.members.filter(member => member.id === id);
        this.loadMembers();
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  archive(): void {
    this.projectService.delete(this.project.id).subscribe(
      () => this.router.navigate([ '/projects' ]),
      errorResponse => this.errorMessage = errorResponse.error.message
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
      errorResponse => this.errorMessage = errorResponse.error.message
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
