import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from "../Constants";

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(private http: HttpClient) {
  }

  get(id): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/options/${id}`);
  }

  findOptions(id: number): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/options?activityId=${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/options`, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${Constants.API_BASE}/options/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${Constants.API_BASE}/options/${id}`);
  }

  vote(id: number): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/options/${id}/vote`, {});
  }

  
}