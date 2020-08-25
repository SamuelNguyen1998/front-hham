import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from "../_models/User";
import { UserService } from '../_services/user.service';
import { JobTitleService } from "../_services/job-title.service";
import { Invitation } from "../_models/Invitation";
import { DataValidatorService } from "../_services/data-validator.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './create-account.component.html',
  styleUrls: [ './create-account.component.scss' ]
})
export class CreateAccountComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
    displayName: '',
    email: '',
    admin: false,
  };
  touched = {
    username: false,
    password: false,
  };
  errorMessage = '';
  invitation: Invitation;

  constructor(private userService: UserService,
              private jobTitleService: JobTitleService,
              private router: Router,
              private route: ActivatedRoute,
              private validate: DataValidatorService) {
    this.route.queryParams.subscribe(params => {
      this.userService.getInvitation(params.token).subscribe(
        response => {
          this.invitation = response.data;
          this.invitation.expiredOn = new Date(response.data.expiredOn);
          this.user.email = this.invitation.email;
          this.user.activationToken = response.data.token;
        },
        errorResponse => {
          this.errorMessage = errorResponse.error.message;
        }
      );
    });
  }

  ngOnInit(): void {
  }

  isInvitationValid(): boolean {
    return this.invitation?.expiredOn > new Date();
  }

  create(): void {
    this.touched = {
      username: true,
      password: true,
    };
    if (!this.usernameIsValid() || !this.passwordIsValid()) {
      return;
    }
    this.userService.activate(this.user).subscribe(
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
    };
    this.user = {
      username: '',
      password: '',
      displayName: '',
      email: this.user.email,
      admin: false,
    };
  }

  usernameIsEmpty(): boolean {
    return !this.validate.nonEmpty(this.user.username);
  }

  usernameIsValid(): boolean {
    return this.validate.username(this.user.username);
  }

  passwordIsEmpty(): boolean {
    return !this.validate.nonEmpty(this.user.password);
  }

  passwordIsValid(): boolean {
    return this.user.password.length >= 8;
  }
}
