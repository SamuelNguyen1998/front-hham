import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from '../Constants';
import { Activity } from "../_models/Activity";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/activities`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/activities/${ id }`);
  }

  create(data: Activity): Observable<any> {
    const query = data.projectId ? `?projectId=${ data.projectId }` : '';
    return this.http.post(`${ Constants.API_BASE }/activities${ query }`, data);
  }

  update(id: number, data): Observable<any> {
    return this.http.put(`${ Constants.API_BASE }/activities/${ id }`, data);
  }

  lock(id: number): Observable<any> {
    return this.http.put(`${ Constants.API_BASE }/activities/${ id }/lock`, {});
  }

  unlock(id: number): Observable<any> {
    return this.http.put(`${ Constants.API_BASE }/activities/${ id }/unlock`, {});
  }

  finish(id: number): Observable<any> {
    return this.http.put(`${ Constants.API_BASE }/activities/${ id }/finish`, {});
  }

  cancel(id: number): Observable<any> {
    return this.http.put(`${ Constants.API_BASE }/activities/${ id }/cancel`, {});
  }

  findByName(name: string): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/activities?name=${ name }`);
  }

  findAllInProject(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/activities?projectId=${ id }`);
  }

  getAllActivityOfUser(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/activities?userId=${ id }`);
  }

  getAdmins(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/activities/${ id }/admins`);
  }

  notify(id: number): Observable<any> {
    return this.http.post(`${ Constants.API_BASE }/activities/${ id }/notify`, {});
  }

  getVotes(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/votes?activityId=${ id }`);
  }

  getMembers(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/activities/${ id }/members`);
  }
}
