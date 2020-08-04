import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from '../Constants';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  findByName(name): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/projects?name=${name}`);
  }
}
