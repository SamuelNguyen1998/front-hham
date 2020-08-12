import { Component, OnInit } from '@angular/core';
import { User } from "../_models/User";
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.scss' ]
})
export class UsersComponent implements OnInit {

  users: User[];
  searchTerm: string;

  constructor(public auth: AuthService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.retrieveUser();
  }

  retrieveUser(): void {
    this.userService.getAll().subscribe(
      response => this.users = response.data,
      console.log
    );
  }

  searchByName(): void {
    this.userService.findByName(this.searchTerm).subscribe(
      response => this.users = response.data,
      console.log
    );
  }

}
