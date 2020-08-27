import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from "rxjs";

import { Constants } from '../Constants';
import { User } from "../_models/User";
import { Session } from "../_models/Session";
import { LoginRequest } from '../_models/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable:variable-name
  private m_loggedIn = false;
  private m_session: Session = {
    createdOn: undefined,
    expiredOn: undefined,
    token: "",
    userId: 0
  };
  // tslint:enable
  user: User;
  private source = new BehaviorSubject<boolean>(this.m_loggedIn);
  public loginStateChange$ = this.source.asObservable();

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
      this.m_session = session;
      this.user = JSON.parse(AuthService.getStorageItem('user'));
      this.loggedIn = true;
    }
  }

  get loggedIn(): boolean {
    return this.m_loggedIn;
  }

  set loggedIn(value: boolean) {
    this.m_loggedIn = value;
    this.source.next(value);
  }

  get token(): string {
    return this.m_session.token;
  }

  login(loginRequest: LoginRequest): Promise<void> {
    const endpoint = `${ Constants.BACKEND_SERVER }/auth/login`;
    return this.http
      .post(endpoint, loginRequest)
      .toPromise()
      .then((response: any) => {
          this.m_session = response.session;
          this.user = response.user;
          this.loggedIn = true;
          const storage = loginRequest.keepSignedIn ? localStorage : sessionStorage;
          storage.setItem('session', JSON.stringify(this.m_session));
          storage.setItem('user', JSON.stringify(this.user));
          setTimeout(() => {
            this.logout();
          }, new Date(this.m_session.expiredOn).getTime() - Date.now());
        }
      );
  }

  logout(): void {
    const endpoint = `${ Constants.BACKEND_SERVER }/auth/logout`;
    // The interceptor will attach the token automatically, no need to specify it here
    this.http.post(endpoint, {}).subscribe();
    // Need to destroy after POST so the token can be attached to logout request
    this.destroySession();
  }

  destroySession(): void {
    this.loggedIn = undefined;
    this.m_session = undefined;
    this.user = undefined;
    localStorage.clear();
    sessionStorage.clear();
  }
}
