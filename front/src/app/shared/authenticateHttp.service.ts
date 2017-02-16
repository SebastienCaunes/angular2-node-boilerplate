import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Router} from "@angular/router";

@Injectable()
export class AuthenticateHttpService extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private route: Router) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch((error: Response) => {
      if (error.status === 401) {
        console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
        this.route.navigateByUrl("/signin");
      }
      return Observable.throw(error);
    });
  }
}
