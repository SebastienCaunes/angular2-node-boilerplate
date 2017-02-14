import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.css']
})

export class LostPasswordComponent {

  lostPasswordForm : FormGroup;

  constructor(fb: FormBuilder,private http:Http){
    this.lostPasswordForm = fb.group({
      'email' : [null, Validators.required]
    })
  }

  submitForm(value: any):void{

    this.http.post(`${environment.apiBaseUrl}register`, value)
      .subscribe( u => console.log(u),
        err => console.error(err));
  }
}
