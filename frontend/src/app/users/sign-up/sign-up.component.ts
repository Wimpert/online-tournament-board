import { PasswordValidation } from './../password.validation';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../../../models/user.model';
 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent  {

  signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    userName: ['', [Validators.required]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    firstName: [''],
    lastName: [''],
  },  {
    validator: PasswordValidation.MatchPassword // your validation method
  });

  constructor(private formBuilder : FormBuilder, private userService: UserService) {}

  onSubmit(){

    if(this.signUpForm.valid){
      const user : User = new User();
      user.email = this.signUpForm.controls.email.value;
      user.password = this.signUpForm.controls.password.value;
      user.userName = this.signUpForm.controls.userName.value;
      user.firstName = this.signUpForm.controls.firstName.value;
      user.lastName = this.signUpForm.controls.lastName.value;
      this.userService.createUser(user).subscribe(
        (user) => {console.log(user);}
      );
    }
  }

}
