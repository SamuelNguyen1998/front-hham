import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  currentUser: User;

  errorMessage = '';

  userTouched = {
    username: false,
    email: false,
  };


  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id): void {
    this.userService.get(id).subscribe(
      response => {
        this.currentUser = response.data;
        console.log(this.currentUser.id);
      },
      error => {
        console.log(error);
      });
  }

  update(): void {
    this.userService.update(this.currentUser.id, this.currentUser).subscribe(
      response => {
        // TODO: Flash success message
        console.log(response);

      },
      error => {
        this.errorMessage = 'Failed creating new user';
        console.log(error);
      }
    );
  }

  usernameIsValid(): boolean {
    return /[A-Za-z]/.test(this.currentUser.username);
  }

  emailIsValid(): boolean {
    // Should I check for trillions of weird but valid combinations?
    return this.currentUser.email.length > 3 && this.currentUser.email.indexOf('@') >= 0;
  }
}
