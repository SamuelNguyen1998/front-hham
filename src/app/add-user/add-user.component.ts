import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JobTitle } from "../_models/JobTitle";
import { JobService } from '../_services/job.service';
import { UserService } from '../_services/user.service';
import { User } from "../_models/User";

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
    jobTitle: '',
    admin: false,
  };

  userTouched = {
    username: false,
    password: false,
    email: false,
    jobTitle: false,
  };

  errorMessage = '';

  constructor(private userService: UserService,
              private jobService: JobService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadJobTitle();
  }

  create(): void {
    this.userService.create(this.user).subscribe(
      response => {
        // TODO: Flash success message
        this.router.navigate([ `/users/${ response.id }` ]);
      },
      error => {
        this.errorMessage = 'Failed creating new user';
        console.log(error);
      }
    );
  }

  loadJobTitle(): void {
    this.jobService.getAll().subscribe(
      response => this.jobTitle = response.data,
      console.log
    );
  }

  reset(): void {
    this.errorMessage = '';
    this.userTouched = {
      username: false,
      password: false,
      email: false,
      jobTitle: false,
    };
    this.user = {
      username: '',
      password: '',
      displayName: '',
      email: '',
      jobTitle: '',
      admin: false,
    };
  }

  usernameIsValid(): boolean {
    return /[A-Za-z]/.test(this.user.username);
  }

  passwordIsValid(): boolean {
    return this.user.password.length >= 8;
  }

  emailIsValid(): boolean {
    // Should I check for trillions of weird but valid combinations?
    return this.user.email.length > 3 && this.user.email.indexOf('@') >= 0;
  }
}
