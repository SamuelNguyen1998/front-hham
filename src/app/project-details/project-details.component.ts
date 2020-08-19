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
  users: User[];
  successMessage = '';
  errorMessage = '';
  isAdminListExpanded = false;
  isMemberListExpanded = false;
  isActivityListExpanded = false;
  isInEditMode = false;
  id = this.route.snapshot.params.id;
  idOfTheSelectedMemberToPromote: number;
  idOfTheSelectedUserToAddToProject: number;

  constructor(public auth: AuthService,
              private projectService: ProjectService,
              private activityService: ActivityService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadProject();
    this.loadMembers();
    this.loadAllUsers();
    this.loadActivities();
  }

  get admins(): User[] {
    return this.members?.filter(member => member.admin);
  }

  get regularMembers(): User[] {
    return this.members?.filter(member => !member.admin);
  }

  get usersNotInProject(): User[] {
    return this.users?.filter(user =>
      !this.members?.find(member => member.id === user.id)
    );
  }

  loadProject(): void {
    this.projectService.get(this.id).subscribe(
      response => this.project = response.data,
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
    this.projectService.getMembers(this.id).subscribe(
      response => this.members = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message,
    );
  }

  loadAllUsers(): void {
    this.userService.getAll().subscribe(
      response => this.users = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message,
    );
  }

  removeMember(id: number): void {
    this.projectService.removeMember(this.project.id, id).subscribe(
      response => {
        this.successMessage = `${ response.data.displayName } has been successfully removed from the project`;
        this.members = this.members.filter(member => member.id !== id);
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  removeAdmin(id: number): void {
    this.projectService.removeAdmin(this.project.id, id).subscribe(
      response => {
        this.successMessage = `${ response.data.displayName } has been set to regular member in the project`;
        const index = this.members.findIndex(admin => admin.id === id);
        this.members[index].admin = false;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  archive(): void {
    this.projectService.archive(this.project.id).subscribe(
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

  updateAdminListState(): void {
    // Click events are fired before the state change, so we need to
    // check for the absence of the class 'show' instead of its presence
    const classes = document.getElementById('adminList').classList;
    this.isAdminListExpanded = !classes.contains('show');
  }

  updateMemberListState(): void {
    // Click events are fired before the state change, so we need to
    // check for the absence of the class 'show' instead of its presence
    const classes = document.getElementById('memberList').classList;
    this.isMemberListExpanded = !classes.contains('show');
  }

  updateActivityListState(): void {
    // Click events are fired before the state change, so we need to
    // check for the absence of the class 'show' instead of its presence
    const classes = document.getElementById('activityList').classList;
    this.isActivityListExpanded = !classes.contains('show');
  }

  promoteToAdmin(event: Event): void {
    const id = this.idOfTheSelectedMemberToPromote;
    // Don't close dialog when validation error occurs
    if (id === null) {
      event.stopPropagation();
      this.errorMessage = 'You have not chosen any member to promote yet';
      return;
    }
    this.projectService.addAdmin(this.project.id, id).subscribe(
      response => {
        this.successMessage = `${ response.data.displayName } has been promoted to project admin`;
        this.members.find(admin => admin.id === id).admin = true;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  addUserToProject(event: Event): void {
    const id = this.idOfTheSelectedUserToAddToProject;
    // Don't close dialog when validation error occurs
    if (id === null) {
      event.stopPropagation();
      this.errorMessage = 'You have not chosen any user to add yet';
      return;
    }
    this.projectService.addMember(this.project.id, id).subscribe(
      response => {
        this.successMessage = `${ response.data.displayName } has been added to project`;
        this.members.push(response.data);
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  selectMemberToPromote(event): void {
    if (event.target.checked) {
      this.idOfTheSelectedMemberToPromote = +event.target.value;
    }
  }

  selectUserToAddToProject(event): void {
    if (event.target.checked) {
      this.idOfTheSelectedUserToAddToProject = +event.target.value;
    }
  }
}
