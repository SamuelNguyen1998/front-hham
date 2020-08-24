import { Component, OnInit } from '@angular/core';
import { User } from "../_models/User";
import { JobTitle } from "../_models/JobTitle";
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { JobTitleService } from "../_services/job-title.service";
import { ProjectService } from "../_services/project.service";
import { Project } from "../_models/Project";
import { DataValidatorService } from "../_services/data-validator.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.scss' ]
})
export class UsersComponent implements OnInit {
  users: User[];
  visibleUsers: User[];
  searchTerm = '';
  idOfTheUserToDeactivate = null;
  successMessage = '';
  errorMessage = '';
  idOfTheUserToEdit: number;
  editingUser: User = {
    admin: false,
    displayName: '',
    email: '',
    jobTitle: { id: null, name: '' },
    username: '',
  };
  jobTitles: JobTitle[];
  touched = { username: false, email: false };
  userSelectedToDeactivate: User;
  projectsAdministering: Project[] = [];

  constructor(public auth: AuthService,
              private userService: UserService,
              private projectService: ProjectService,
              private jobTitleService: JobTitleService,
              private validate: DataValidatorService) {
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadJobTitles();
    this.projectService.getAllAdministering().subscribe(
      response => this.projectsAdministering = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  loadUsers(): void {
    this.userService.getAll().subscribe(
      response => {
        this.users = response.data;
        this.visibleUsers = this.users;
      },
      errorResponse => this.errorMessage = errorResponse.error.message,
    );
  }

  loadJobTitles(): void {
    this.jobTitleService.getAll().subscribe(
      response => this.jobTitles = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  searchByName(): void {
    if (this.searchTerm === '') {
      this.visibleUsers = this.users;
      return;
    }
    this.visibleUsers = this.users.filter(user =>
      user.username.indexOf(this.searchTerm) >= 0 ||
      user.displayName.indexOf(this.searchTerm) >= 0
    );
    // This event is used to trigger footer repositioning
    document.body.dispatchEvent(new Event('resize'));
  }

  confirmDeactivate(id: number): void {
    this.userSelectedToDeactivate = this.users.find(user => user.id === id);
  }

  deactivate(): void {
    this.userService.deactivate(this.userSelectedToDeactivate.id).subscribe(
      response => {
        this.users = this.users.filter(user => user.id !== response.data.id);
        // Trigger this to update the list of visible users
        this.searchByName();
        this.successMessage = `Successfully deactivated user ${ response.data.username }`;
        // Trigger footer repositioning
        document.body.dispatchEvent(new Event('resize'));
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  turnOffFiltering(): void {
    if (this.searchTerm === '') {
      this.visibleUsers = this.users;
    }
  }

  beginEdit(id: number): void {
    this.idOfTheUserToEdit = id;
    this.editingUser = { ...this.users.find(user => user.id === id) };
    if (this.editingUser.jobTitle === null) {
      this.editingUser.jobTitle = { id: null, name: '' };
    }
    this.touched = { username: false, email: false };
  }

  saveEdit(event: Event): void {
    this.touched = { email: true, username: true };
    if (!this.usernameIsValid() || !this.emailIsValid()) {
      event.stopPropagation();
      return;
    }
    this.userService.update(this.editingUser).subscribe(
      response => {
        const index = this.users.findIndex(user => user.id === response.data.id);
        this.users[index] = response.data;
        this.successMessage = `Successfully updated user ${ response.data.username }`;
        this.searchByName(); // Reload search result
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  usernameIsEmpty(): boolean {
    return !this.validate.nonEmpty(this.editingUser.username);
  }

  usernameIsValid(): boolean {
    return this.validate.username(this.editingUser.username);
  }

  emailIsEmpty(): boolean {
    return !this.validate.nonEmpty(this.editingUser.email);
  }

  emailIsValid(): boolean {
    return this.validate.email(this.editingUser.email);
  }
}
