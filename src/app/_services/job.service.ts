import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Constants } from '../Constants';
import { Job } from '../_models/Job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/jobs`);
  }

  get(id): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/jobs/${id}`);
  }

  create(data): Observable<any>{
    return this.http.post(`${Constants.API_BASE}/jobs`, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${Constants.API_BASE}/jobs/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${Constants.API_BASE}/jobs/${id}`);
  }

  findByName(name): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/jobs?name=${name}`);
  }



  // TO DO HERE
  // DO IT LATER
  searchJob(term: string): Observable<Job[]>{
    if(!term.trim()){
      return of([]);
    }
  }

}
