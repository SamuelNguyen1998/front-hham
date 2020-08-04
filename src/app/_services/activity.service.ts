import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from "../Constants";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/activities`);
  }

  get(id): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/activities/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/activities`, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${Constants.API_BASE}/activities/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${Constants.API_BASE}/activities/${id}`);
  }

  findByName(name): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/activities?name=${name}`);
  }

  vote(id: number): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/options/${id}/vote`, {});
  }

  findAllInProject(id: number): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/activities?projectId=${id}`);
  }

  findOptions(id: number): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/options?activityId=${id}`);
  }
}
