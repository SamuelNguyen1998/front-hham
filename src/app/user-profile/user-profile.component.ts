import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/User';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ]
})
export class UserProfileComponent implements OnInit {
  user: User = { ...this.auth.user };
  message = '';
  deactivated = false;
  passwordChanged = '';

  constructor(public auth: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  updateUser(): void {
    this.userService.update(this.user).subscribe(
      response => {
        this.message = 'The user was updated successfully!';
        this.auth.user = { ...this.user };
      },
      error => console.log(error)
    );
  }

  changePassword(): void {
    const data: User = { ...this.auth.user };
    data.password = this.user.password;
    this.userService.update(data).subscribe(
      response => {
        this.message = 'The user was updated successfully!';
        this.auth.user = { ...data };
      },
      error => console.log(error)
    );
  }

  deactivate(): void {
    this.userService.deactivate(this.user.id).subscribe(
      response => {
        this.message = `Successfully deactivated user ${ response.data.username }`;
        this.deactivated = true;
        this.auth.logout();
      }
    );
  }
}
