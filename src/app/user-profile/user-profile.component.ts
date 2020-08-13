import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: User[];
  message = '';
  

  constructor(
    public auth: AuthService, 
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userService.get(this.auth.currentUser.id).subscribe(
      response => {
        this.currentUser = response.data;
        console.log(response.data);
      },
      error => {
        console.log(error);
      });
  }
  updateUser(): void {
    this.userService.update(this.auth.currentUser.id, this.currentUser).subscribe(
      response => {
        console.log(response);
        this.message = 'The user was updated successfully!';
      },
      error => {
        console.log(error);
      }
    );
  }
}
