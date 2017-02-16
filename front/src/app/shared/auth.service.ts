import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CookieService} from "./cookie.service";
import {Http, Response} from "@angular/http";
import { environment } from '../../environments/environment';

//WTF !!! http://stackoverflow.com/questions/34581471/angular2-http-is-missing-map-function
import 'rxjs/add/operator/map';
import {UrlTree, Router} from "@angular/router";

@Injectable()
export class AuthService {

  private isLogged: boolean = false;
  public user: any;
  public redirectUrl: String;

  constructor(private cookeService : CookieService, private http: Http, private router: Router) {}

  isLoggedIn(): boolean {
    return this.cookeService.getCookie("connect.sid").length > 0;
  }

  login(value): Observable<any> {

      return this.http.post(`${environment.apiBaseUrl}login`,value)
            .map(response => {
                this.user = response.json();
                response.json();
              });
  }

  logout(): Observable<any>  {
    return this.http.get(`${environment.apiBaseUrl}logout`)
      .map(res => {
        res.json();
      })
      .catch(err => Observable.of(err.message))
      .finally(() => {
        this.user = {};
        this.cookeService.deleteCookie("connect.sid");
        this.router.navigateByUrl("/");
      });
  }
}
