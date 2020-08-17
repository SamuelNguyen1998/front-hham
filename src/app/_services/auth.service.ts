import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Constants } from '../Constants';
import { LoginRequest } from '../_models/LoginRequest';
import { Session } from "../_models/Session";
import { User } from "../_models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  private static getStorageItem(key): string {
    const item = sessionStorage.getItem(key);
    if (item !== null) {
      return item;
    }
    return localStorage.getItem(key);
  }

  constructor(private http: HttpClient) {
    const sessionString = AuthService.getStorageItem('session');
    if (sessionString === null) {
      return;
    }
    const session = JSON.parse(sessionString);
    session.createdOn = new Date(session.createdOn);
    session.expiredOn = new Date(session.expiredOn);
    if (session.expiredOn > Date.now()) {
      this.m_loggedIn = true;
      this.m_session = session;
      this.m_user = JSON.parse(AuthService.getStorageItem('user'));
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
    const endpoint = `${ Constants.DOC_BASE }/auth/login`;
    return this.http
      .post(endpoint, loginRequest, Constants.DEFAULT_HTTP_OPTIONS)
      .toPromise()
      .then((response: any) => {
          this.m_loggedIn = true;
          this.m_session = response.session;
          this.m_user = response.user;
          const storage = loginRequest.keepSignedIn ? localStorage : sessionStorage;
          storage.setItem('session', JSON.stringify(this.m_session));
          storage.setItem('user', JSON.stringify(this.m_user));
        }
      );
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.m_loggedIn = undefined;
    this.m_session = undefined;
    this.m_user = undefined;
  }
}
