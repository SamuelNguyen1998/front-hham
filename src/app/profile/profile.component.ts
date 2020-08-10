import { Component, OnInit } from '@angular/core';

import { AuthService } from "../_services/auth.service";
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})
export class ProfileComponent implements OnInit {

  currentUser: User[];
  

  constructor(
    public auth: AuthService, 
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.get(this.auth.currentUser.id).subscribe(
      response => {
        this.currentUser = response.data;
      },
      error => {
        console.log(error);
      });
  }

}
