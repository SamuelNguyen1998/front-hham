import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from '../Constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/projects`);
  }

  get(id): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/projects/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/projects`, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${Constants.API_BASE}/projects/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${Constants.API_BASE}/projects/${id}`);
  }

  findByName(name): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/projects?name=${name}`);
  }

  getMember(id): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/projects/${id}/members`);
  }
  
  addMember(id, data): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/projects/${id}/members`, data);
  }

  removeMember(id, idMember): Observable<any> {
    return this.http.delete(`${Constants.API_BASE}/projects/${id}/members/${idMember}`);
  }
}
