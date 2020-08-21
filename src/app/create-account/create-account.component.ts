import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from "../_models/User";
import { UserService } from '../_services/user.service';
import { JobTitleService } from "../_services/job-title.service";
import { Invitation } from "../_models/Invitation";

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
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.userService.getInvitation(params.token).subscribe(
        response => {
          this.invitation = response.data;
          this.invitation.expiredOn = new Date(response.data.expiredOn);
          this.user.email = this.invitation.email;
          this.user.activationToken = response.data.token;
        },
        errorResponse => {this.errorMessage = errorResponse.error.message;
        console.log(errorResponse)}
      );
    });
  }

  isInvitationValid(): boolean {
    return this.invitation?.expiredOn > new Date();
  }

  ngOnInit(): void {
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
        console.log(response);
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
