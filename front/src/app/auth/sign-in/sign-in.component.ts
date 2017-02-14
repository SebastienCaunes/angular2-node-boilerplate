import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {

  signInForm : FormGroup;

  constructor(fb: FormBuilder,private http:Http){
    this.signInForm = fb.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
    })
  }

  submitForm(value: any):void{

    this.http.post(`${environment.apiBaseUrl}login`, value)
      .subscribe( u => console.log(u),
        err => console.error(err));
  }
}
