import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from "../Constants";
import { Option } from "../_models/Option";

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  constructor(private http: HttpClient) {
  }

  get(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/options/${ id }`);
  }

  findOptions(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/options?activityId=${ id }`);
  }

  create(data: Option): Observable<any> {
    return this.http.post(`${ Constants.API_BASE }/options`, data);
  }

  update(id: number, data: Option): Observable<any> {
    return this.http.put(`${ Constants.API_BASE }/options/${ id }`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${ Constants.API_BASE }/options/${ id }`);
  }

  vote(optionId: number, userId: number, note: string): Observable<any> {
    return this.http.post(`${ Constants.API_BASE }/votes`, { userId, optionId, note });
  }

  getVoteInActivity(activityId: number, userId: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/votes?userId=${ userId }&activityId=${ activityId }`);
  }
}
