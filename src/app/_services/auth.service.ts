import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Constants } from "../Constants";
import { LoginRequest } from "../_models/LoginRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedIn: boolean = false;
  private _token: string = '';
  private _currentUser: {
    id: number,
    username: string,
    displayName: string,
    email: string,
    isAdmin: boolean,
  };

  constructor(private http: HttpClient) {
    const lastAccess = +localStorage.getItem("lastAccess");
    const elapsedTimeInMs = Date.now() - lastAccess;
    const threshold = 60 * 60 * 1000; // 60 minutes
    if (lastAccess && elapsedTimeInMs < threshold) {
      this._loggedIn = true;
      this._token = localStorage.getItem("token");
      this._currentUser = JSON.parse(localStorage.getItem("userInfo"));
    }
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  get token(): string {
    return this._token;
  }

  get currentUser(): {
    id: number,
    username: string,
    displayName: string,
    email: string,
    isAdmin: boolean,
  } {
    return this._currentUser;
  }

  async login(loginRequest: LoginRequest): Promise<void> {
    const response: any = await this.http.post(Constants.DOC_BASE + '/auth/login',
      loginRequest,
      Constants.DEFAULT_HTTP_OPTIONS).toPromise();
    if (response.code > 0) {
      throw new Error(response.message);
    }
    this._loggedIn = true;
    this._token = response.token;
    const { id, username, displayName, email, admin } = response;
    this._currentUser = { id, username, displayName, email, isAdmin: admin }
    localStorage.setItem("token", response.token);
    localStorage.setItem("userInfo", JSON.stringify(this.currentUser));
    localStorage.setItem("lastAccess", Date.now().toString());
  }

  logout(): void {
    localStorage.clear();
    this._loggedIn = false;
    this._token = '';
    this._currentUser = undefined;
  }
}
