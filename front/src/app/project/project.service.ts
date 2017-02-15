import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Http, Response, URLSearchParams} from "@angular/http";
import { environment } from '../../environments/environment';
import {AuthService} from "../shared/auth.service";

@Injectable()
export class ProjectService {

  constructor(private http: Http, private authService: AuthService) {}

  getAllProjects(): Observable<any> {

    return this.http.get(`${environment.apiBaseUrl}projects`)
                .map(res => res.json());
  }

  getProject(id: String): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}projects/${id}`)
                .map(res => res.json());
  }

  saveProject(id: String, project): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}projects/${id}`, project)
      .map(res => res.json());
  }

  modifyProject(id: String, project: any): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}projects/${id}`, project)
      .map(res => res.json());
  }

  deleteProject(id: String): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}projects/${id}`)
      .map(res => res.json());
  }
}
