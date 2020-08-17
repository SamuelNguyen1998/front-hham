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

  get(id): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/users/${ id }`);
  }

  create(data: User): Observable<any> {
    return this.http.post(`${ Constants.API_BASE }/users`, data);
  }

  update(data: User): Observable<any> {
    return this.http.put(`${ Constants.API_BASE }/users/${ data.id }`, data);
  }

  deactivate(id: number): Observable<any> {
    return this.http.delete(`${ Constants.API_BASE }/users/${ id }`);
  }

  findByName(name: string): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/users?username=${ name }`);
  }
}
