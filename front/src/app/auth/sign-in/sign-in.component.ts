import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {

  signInForm : FormGroup;

  constructor(fb: FormBuilder, private authService: AuthService, private router: Router){
    this.signInForm = fb.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
    })
  }

  submitForm(value: any) :void {

    this.authService.login(value)
        .subscribe(
            res => this.router.navigate(['/home']),
            err => console.log(err));
  }
}
