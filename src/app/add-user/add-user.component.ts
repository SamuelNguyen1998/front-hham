import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from "../_models/User";
import { JobTitle } from "../_models/JobTitle";
import { UserService } from '../_services/user.service';
import { JobTitleService } from "../_services/job-title.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: [ './add-user.component.scss' ]
})
export class AddUserComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
    displayName: '',
    email: '',
    admin: false,
    jobTitle: { id: null, name: '' }
  };
  touched = {
    username: false,
    password: false,
    email: false,
  };
  errorMessage = '';
  jobTitles: JobTitle[] = [];

  constructor(private userService: UserService,
              private jobTitleService: JobTitleService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadJobTitles();
  }

  loadJobTitles(): void {
    this.jobTitleService.getAll().subscribe(
      response => this.jobTitles = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message,
    );
  }

  create(): void {
    this.touched = {
      username: true,
      password: true,
      email: true,
    };
    if (!this.usernameIsValid() || !this.passwordIsValid() || !this.emailIsValid()) {
      return;
    }
    this.userService.create(this.user).subscribe(
      response => {
        this.router.navigate([ `/users` ]);
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  reset(): void {
    this.errorMessage = '';
    this.touched = {
      username: false,
      password: false,
      email: false,
    };
    this.user = {
      username: '',
      password: '',
      displayName: '',
      email: '',
      admin: false,
      jobTitle: { id: null, name: '' },
    };
  }


  usernameIsEmpty(): boolean {
    return this.user.username.length === 0;
  }

  usernameIsValid(): boolean {
    return /^[A-Za-z0-9.]+$/.test(this.user.username);
  }

  passwordIsEmpty(): boolean {
    return this.user.password.length === 0;
  }

  passwordIsValid(): boolean {
    return this.user.password.length >= 8;
  }

  emailIsEmpty(): boolean {
    return this.user.email.length === 0;
  }

  emailIsValid(): boolean {
    return /^[-\w.]+@[-\w.]+$/.test(this.user.email);
  }
}
