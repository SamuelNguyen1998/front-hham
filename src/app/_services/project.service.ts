import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from '../Constants';
import { Project } from "../_models/Project";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/projects?userId=${ this.auth.user.id }`);
  }

  getAllAdministering(): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/projects?adminId=${ this.auth.user.id }`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/projects/${ id }`);
  }

  create(data: Project): Observable<any> {
    return this.http.post(`${ Constants.API_BASE }/projects`, data);
  }

  update(id: number, data: Project): Observable<any> {
    return this.http.put(`${ Constants.API_BASE }/projects/${ id }`, data);
  }

  archive(id: number): Observable<any> {
    return this.http.delete(`${ Constants.API_BASE }/projects/${ id }`);
  }

  getMembers(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/projects/${ id }/members`);
  }

  addMember(id: number, userId: number): Observable<any> {
    return this.http.post(`${ Constants.API_BASE }/projects/${ id }/members`, { id: userId });
  }

  removeMember(id: number, memberId): Observable<any> {
    return this.http.delete(`${ Constants.API_BASE }/projects/${ id }/members/${ memberId }`);
  }

  getAdmins(id: number): Observable<any> {
    return this.http.get(`${ Constants.API_BASE }/projects/${ id }/admins`);
  }

  addAdmin(id: number, userId: number): Observable<any> {
    return this.http.post(`${ Constants.API_BASE }/projects/${ id }/admins`, { id: userId });
  }

  removeAdmin(id: number, adminId: number): Observable<any> {
    return this.http.delete(`${ Constants.API_BASE }/projects/${ id }/admins/${ adminId }`);
  }
}
