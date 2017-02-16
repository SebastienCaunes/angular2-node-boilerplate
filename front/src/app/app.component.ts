import { Component } from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService : AuthService, private router:Router) {}

  logged(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout()
      .subscribe(
        () => {},
        err => console.error(err));
  }
}
