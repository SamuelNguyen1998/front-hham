import { Component, OnInit } from '@angular/core';
import { User } from "../_models/User";
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { JobTitle } from "../_models/JobTitle";
import { JobTitleService } from "../_services/job-title.service";

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
  isInEditMode = false;
  idOfTheUserToEdit: number;
  editingUser: User = {
    admin: false,
    displayName: '',
    email: '',
    jobTitle: '',
    username: '',
  };
  jobTitles: JobTitle[];
  touched = { username: false, email: false };

  constructor(public auth: AuthService,
              private userService: UserService,
              private jobTitleService: JobTitleService) {
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadJobTitles();
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
    this.idOfTheUserToDeactivate = id;
  }

  deactivate(): void {
    this.userService.deactivate(this.idOfTheUserToDeactivate).subscribe(
      response => {
        this.users = this.users.filter(user => user.id === response.data.id);
        // Trigger this to update the list of visible users
        this.searchByName();
        this.successMessage = `Successfully deactivated user ${ response.data.username }`;
      },
      errorResponse => {
        this.errorMessage = errorResponse.error.message;
      }
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
    this.touched = { username: false, email: false };
  }

  saveEdit(): void {
    this.userService.update(this.editingUser).subscribe(
      response => {
        const index = this.users.findIndex(user => user.id === response.data.id);
        this.users[index] = response.data;
        this.successMessage = `Successfully updated user ${ response.data.username }`;
        this.searchByName(); // Reload search result
        this.isInEditMode = false;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  usernameIsEmpty(): boolean {
    return this.editingUser.username.length === 0;
  }

  usernameIsValid(): boolean {
    return /^[A-Za-z0-9.]+$/.test(this.editingUser.username);
  }

  emailIsEmpty(): boolean {
    return this.editingUser.email.length === 0;
  }

  emailIsValid(): boolean {
    return this.editingUser.email.length > 3 &&
      this.editingUser.email.indexOf('@') >= 0 &&
      this.editingUser.email.indexOf('@') === this.editingUser.email.lastIndexOf('@');
  }
}
