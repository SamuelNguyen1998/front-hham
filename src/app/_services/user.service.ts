import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from '../Constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/users`);
  }

  get(id): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/user/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/users`, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${Constants.API_BASE}/user/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${Constants.API_BASE}/user/${id}`);
  }
}
