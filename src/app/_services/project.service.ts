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

  get(id: number): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/projects/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/projects`, data);
  }

  update(id: number, data): Observable<any> {
    return this.http.put(`${Constants.API_BASE}/projects/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${Constants.API_BASE}/projects/${id}`);
  }

  findByName(name: string): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/projects?name=${name}`);
  }

  getMember(id: number): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/projects/${id}/members`);
  }

  getAllProjectOfUser(id: number): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/projects/${id}/projects`);
  }

  addMember(id: number, data): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/projects/${id}/members`, data);
  }

  removeMember(id: number, idMember): Observable<any> {
    return this.http.delete(`${Constants.API_BASE}/projects/${id}/members/${idMember}`);
  }
}
