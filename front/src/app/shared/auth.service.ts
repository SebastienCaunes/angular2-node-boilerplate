import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CookieService} from "./cookie.service";
import {Http, Response} from "@angular/http";
import { environment } from '../../environments/environment';

//WTF !!! http://stackoverflow.com/questions/34581471/angular2-http-is-missing-map-function
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private isLogged: boolean = false;

  constructor(private cookeService : CookieService, private http: Http) {}

  isLoggedIn(): boolean {
    return this.cookeService.getCookie(" token").length > 0;
  }

  login(value): Observable<any> {
    console.log(value);
    return this.http.post(`${environment.apiBaseUrl}login`, value)
              .map(response => response.json());

  }

  logout(): void {
    console.info("log out");
    this.isLogged = false;
  }
}
