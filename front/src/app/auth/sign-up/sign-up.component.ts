import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {

  signUpForm:FormGroup;


  constructor(private fb:FormBuilder, private http:Http, private router:Router) {
    this.signUpForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],
    })
  }

  submitForm(value:any):void {

    this.http.post(`${environment.apiBaseUrl}register`, value)
      .subscribe(u => {
          console.log(u);
          this.router.navigate(['/signin']);
        }, err => {
          console.error(err)
        }
      );

  }
}
