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
  admins: User[];
  users: User[];
  successMessage = '';
  errorMessage = '';
  isAdminListExpanded = false;
  isMemberListExpanded = false;
  isActivityListExpanded = false;
  isInEditMode = false;
  id = this.route.snapshot.params.id;
  membersSelectedToPromote: { [id: number]: boolean } = {};
  usersSelectedToAddToProject: { [id: number]: boolean } = {};

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
    this.loadAdmins();
    this.loadAllUsers();
    this.loadActivities();
  }

  get regularMembers(): User[] {
    return this.members?.filter(member =>
      !this.admins?.find(admin => admin.id === member.id)
    );
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

  loadAdmins(): void {
    this.projectService.getAdmins(this.id).subscribe(
      response => this.admins = response.data,
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
        this.admins = this.admins.filter(admin => admin.id !== id);
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
    // All members are not chosen
    if (Object.values(this.membersSelectedToPromote).every(value => !value)) {
      event.stopPropagation();
      this.errorMessage = 'No member selected yet';
      return;
    }
    for (const key of Object.keys(this.membersSelectedToPromote)) {
      const id = +key;
      if (this.membersSelectedToPromote[id]) {
        this.projectService.addAdmin(this.project.id, id).subscribe(
          response => {
            this.successMessage = `${ response.data.displayName } has been promoted to project admin`;
            this.admins.push(this.members.find(admin => admin.id === id));
            delete this.membersSelectedToPromote[id];
          },
          errorResponse => this.errorMessage = errorResponse.error.message
        );
      }
    }
  }

  addUserToProject(event: Event): void {
    // No user is chosen
    if (!Object.values(this.usersSelectedToAddToProject).find(value => value === true)) {
      event.stopPropagation();
      this.errorMessage = 'No user selected yet';
      return;
    }
    for (const key of Object.keys(this.usersSelectedToAddToProject)) {
      const id: number = +key;
      // Not checked, just skip it
      if (!this.usersSelectedToAddToProject[id]) {
        return;
      }
      this.projectService.addMember(this.project.id, id).subscribe(
        response => {
          this.successMessage = `${ response.data.displayName } has been added to project`;
          this.members.push(response.data);
          delete this.usersSelectedToAddToProject[id];
        },
        errorResponse => this.errorMessage = errorResponse.error.message
      );
    }
  }

  selectMemberToPromote(event): void {
    const id = +event.target.value;
    this.membersSelectedToPromote[id] = event.target.checked;
  }

  selectUserToAddToProject(event): void {
    const id = +event.target.value;
    this.usersSelectedToAddToProject[id] = event.target.checked;
  }

  currentUserIsProjectAdmin(): boolean {
    return this.admins?.some(admin => admin.id === this.auth.user.id);
  }

  beginPromoteMemberToAdmin(): void {
    this.members.forEach(member => {
      this.membersSelectedToPromote[member.id] = false;
    });
  }

  beginAddUserToProject(): void {
    this.usersNotInProject.forEach(user => {
      this.usersSelectedToAddToProject[user.id] = false;
    });
  }
}
