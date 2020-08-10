import { Component, OnInit } from '@angular/core';

import { UserService } from "../../_services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: [ './add-user.component.scss' ]
})
export class AddUserComponent implements OnInit {
  user: {
    username: string;
    password: string;
    displayName: string;
    email;
  };
  submitted: boolean;

  constructor(
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.newUser();
  }

  saveUser(): void {
    const { password, displayName, email, username } = this.user;
    const data = {
      username,
      password,
      displayName,
      email,
    };
    this.userService.create(data).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.router.navigate(["users"]);
      },
      error => {
        console.log(error);
      }
    );
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      username: null,
      password: null,
      displayName: null,
      email: null,
    };
  }
}
