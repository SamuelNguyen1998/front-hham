import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { LoginRequest } from "../_models/LoginRequest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest = {
    username: "",
    password: "",
    keepSignedIn: false,
  };
  touched = { username: false, password: false };
  errorMessage: string;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.auth.loggedIn) {
      this.router.navigate([ "/" ]);
    }
  }

  onSubmit(event: Event): void {
    if (!this.usernameIsValid() || !this.passwordIsValid()) {
      this.touched = { username: true, password: true };
      event.preventDefault();
      return;
    }
    this.auth.login(this.loginRequest)
      .then(() => this.router.navigate([ '/' ]))
      .catch(errorResponse => {
        this.errorMessage = errorResponse.error.message;
      });
  }

  usernameIsValid(): boolean {
    return this.loginRequest.username.length > 0;
  }

  passwordIsValid(): boolean {
    return this.loginRequest.password.length > 0;
    // return this.loginRequest.password.length >= 8;
  }
}
