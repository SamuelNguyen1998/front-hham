import { Component, OnInit } from '@angular/core';
import { UserService } from "../_services/user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: [ './add-user.component.scss' ]
})
export class AddUserComponent implements OnInit {
  email = '';
  touched = false;
  errorMessage = '';
  submitted = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  isValidEmail(): boolean {
    return 
    /(^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$|^(?![\s\S]))/.test(this.email);
  }

  submit(): void {
    if (!this.isValidEmail()) {
      this.touched = true;
      return;
    }
    this.userService.invite(this.email).subscribe(
      response => this.submitted = true,
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }
}
