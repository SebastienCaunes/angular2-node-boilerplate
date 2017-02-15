import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router) {}

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Redirect the user to the login page
    this.router.navigate(['/signin']);
    return false;
  }
}
