import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from '../Constants';
import { JobTitle } from "../_models/JobTitle";

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/jobs`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/jobs/${ id }`);
  }

  create(data: JobTitle): Observable<any> {
    return this.http.post(`${ Constants.API_BASE }/jobs`, data);
  }

  archive(id: number): Observable<any> {
    return this.http.delete(`${ Constants.API_BASE }/jobs/${ id }`);
  }

  update(data: JobTitle): Observable<any> {
    return this.http.put(`${ Constants.API_BASE }/jobs/${ data.id }`, data);
  }

  findByName(name: string): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/jobs?name=${ name }`);
  }
}
