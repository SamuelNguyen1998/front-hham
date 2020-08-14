import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Constants } from '../Constants';
import { LoginRequest } from '../_models/LoginRequest';
import { Session } from "../_models/Session";
import { Observable } from "rxjs";
import { User } from "../_models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage: Storage = localStorage;
  // tslint:disable-next-line:variable-name
  private m_loggedIn = false;
  // tslint:disable-next-line:variable-name
  private m_session: Session = {
    createdOn: undefined,
    expiredOn: undefined,
    token: "",
    userId: 0
  };
  // tslint:disable-next-line:variable-name
  private m_user: User;

  constructor(private http: HttpClient) {
    const sessionString = this.storage.getItem("session");
    if (sessionString === null) {
      return;
    }
    const session = JSON.parse(sessionString);
    session.createdOn = new Date(session.createdOn);
    session.expiredOn = new Date(session.expiredOn);
    if (session.expiredOn > Date.now()) {
      this.m_loggedIn = true;
      this.m_session = session;
      this.m_user = JSON.parse(this.storage.getItem('user'));
    }
  }

  get loggedIn(): boolean {
    return this.m_loggedIn;
  }

  get token(): string {
    return this.m_session.token;
  }

  get user(): User {
    return this.m_user;
  }

  login(loginRequest: LoginRequest): Promise<void> {
    this.storage = loginRequest.keepSignedIn ? localStorage : sessionStorage;

    const endpoint = `${ Constants.DOC_BASE }/auth/login`;
    return this.http
      .post(endpoint, loginRequest, Constants.DEFAULT_HTTP_OPTIONS)
      .toPromise()
      .then((response: any) => {
        this.m_loggedIn = true;
        this.m_session = response.session;
        this.m_user = response.user;
        this.storage.setItem('session', JSON.stringify(this.m_session));
        this.storage.setItem('user', JSON.stringify(this.m_user));
      });
  }

  logout(): void {
    this.storage.clear();
    this.m_loggedIn = undefined;
    this.m_session = undefined;
    this.m_user = undefined;
  }
}
