import { PasswordValidation } from './../password.validation';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent  {

  signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    firstName: [''],
    lastName: [''],
  },  {
    validator: PasswordValidation.MatchPassword // your validation method
  });

  constructor(private formBuilder : FormBuilder) {}

}
