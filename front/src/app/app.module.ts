import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpModule, RequestOptions, BaseRequestOptions, Headers, Http} from '@angular/http';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AppRoutesModule } from './app.routes';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { LostPasswordComponent } from './auth/lost-password/lost-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component'
import { ProjectModule } from "./project/project.module";
import {AuthService} from "./shared/auth.service";
import {AuthGuard} from "./shared/auth-guard.service";
import {CookieService} from "./shared/cookie.service";
import {AuthenticateHttpService} from "./shared/authenticateHttp.service";

export class MyBaseRequestsOptions extends BaseRequestOptions {
    headers: Headers =  new Headers({
      'X-Requested-With': 'XMLHttpRequest'
    });
    withCredentials: boolean = true;
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
    LostPasswordComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutesModule,
    ProjectModule,
    HttpModule
  ],
  providers: [
    AuthenticateHttpService,
    AuthService,
    AuthGuard,
    { provide: Http, useClass: AuthenticateHttpService },
    CookieService,
    {
      provide: RequestOptions,
      useClass: MyBaseRequestsOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
