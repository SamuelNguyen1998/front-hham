import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../Constants';


@Injectable({
  providedIn: 'root'
})
export class FundService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/transactions`);
  }

  get(id): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/transactions/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/transactions`, data);
  }

  // update(id, data): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  // findByTitle(title): Observable<any> {
  //   return this.http.get(`${baseUrl}?title=${title}`);
  // }
}
