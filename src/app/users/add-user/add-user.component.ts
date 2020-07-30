import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  users = {
    username: '',
    password: '',
    displays_name: '',
    email: '',
    image: '',
    job_title_id: 0,
    is_admin: false
  };
  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    const data = {
      username: this.users.username,
      password: this.users.password,
      displays_name: this.users.displays_name,
      email: this.users.email,
    };

    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newUser(): void {
    this.submitted = false;
    this.users = {
      username: '',
      password: '',
      displays_name: '',
      email: '',
      image: '',
      job_title_id: 0,
      is_admin: false
    };
  }
}
