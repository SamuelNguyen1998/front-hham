import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from '../Constants';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {
  }

  getForOption(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/images/option/${ id }`);
  }

  postForOption(id: number, url: string): Observable<any> {
    return this.http.post(`${ Constants.API_BASE }/images/option/${ id }`, { url });
  }
}
