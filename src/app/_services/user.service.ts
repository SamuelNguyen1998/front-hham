import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from '../Constants';
import { User } from "../_models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/users`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/users/${ id }`);
  }

  update(data: User): Observable<any> {
    return this.http.put(`${ Constants.API_BASE }/users/${ data.id }`, data);
  }

  deactivate(id: number): Observable<any> {
    return this.http.delete(`${ Constants.API_BASE }/users/${ id }`);
  }

  getInvitation(token: string): Observable<any> {
    return this.http.get(`${ Constants.BACKEND_SERVER }/invitation/${ token }`);
  }

  invite(email: string, projectId: number): Observable<any> {
    let endpoint;
    if (projectId !== null) {
      endpoint = `/users/invite/${ projectId }`;
    } else {
      endpoint = `/users/invite`;
    }
    return this.http.post(`${ Constants.API_BASE }${ endpoint }`, { email });
  }

  activate(data: User): Observable<any> {
    return this.http.post(`${ Constants.BACKEND_SERVER }/activate`, data);
  }
}
