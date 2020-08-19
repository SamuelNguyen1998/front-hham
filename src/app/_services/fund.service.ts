import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../Constants';

@Injectable({
  providedIn: 'root'
})
export class FundService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/transactions`);
  }

  getAllFund(): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/transactions/funds`);
  }

  get(id): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/transactions/${ id }`);
  }

  getTransaction(id): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/transactions?projectId=${ id }`);
  }

  create(data): Observable<any> {
    return this.http.post(`${ Constants.API_BASE }/transactions`, data);
  }

  calc(id,data): Observable<any> {
    return this.http.put(`${ Constants.API_BASE }/transactions/calc/${id}`, data);
  }

  remind(data): Observable<any> {
    return this.http.post(`${ Constants.API_BASE }/transactions/remind`, data);
  }
}
