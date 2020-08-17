import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ]
})
export class UserProfileComponent implements OnInit {
  user: User = { ...this.auth.user };
  message = '';

  constructor(public auth: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  updateUser(): void {
    this.userService.update(this.auth.user).subscribe(
      response => {
        this.message = 'The user was updated successfully!';
      },
      error => {
        console.log(error);
      }
    );
  }
}
