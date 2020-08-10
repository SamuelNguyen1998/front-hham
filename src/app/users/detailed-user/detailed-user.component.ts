import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-detailed-user',
  templateUrl: './detailed-user.component.html',
  styleUrls: [ './detailed-user.component.scss' ]
})
export class DetailedUserComponent implements OnInit {

  currentUser = null;
  message = '';
  userForm: FormGroup = this.formBuilder.group({
    username: null,
    displayName: null,
    email: null,
  });
  submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id): void {
    this.userService.get(id).subscribe(
      response => {
        this.currentUser = response.data;
        console.log(response.data);
      },
      error => {
        console.log(error);
      });
  }

  onSubmit() {
    console.log(this.userForm.value);
  }

  updateUser(): void {
    this.userService.update(this.currentUser.id, this.currentUser).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.message = 'The user was updated successfully!';
      },
      error => {
        console.log(error);
      }
    );
    this.router.navigate(["users"]);
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id).subscribe(
      response => {
        //console.log(response);
        this.router.navigate([ '/users' ]);
      },
      error => {
        console.log(error);
      }
    );
  }

}

/*
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  currentUser = null;
  message = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id): void {
    this.userService.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateUser(): void {
    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'User was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/admin']);
        },
        error => {
          console.log(error);
        });
  }
}
*/
