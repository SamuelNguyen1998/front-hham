import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  form: any = {};
  error: string;
  keepSignedIn: boolean;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.auth.loggedIn) {
      this.router.navigate([ "/" ]);
    }
  }

  onSubmit(): void {
    this.auth.login(this.form)
      .then(() => this.router.navigate([ '/' ]))
      .catch((err: Error) => this.error = err.message);
  }
}
