import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.formBuilder.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }
  );

  constructor(private loginService : LoginService, private formBuilder : FormBuilder) { }

  login() {
    const credentials = {username: this.loginForm.controls.username.value, password: this.loginForm.controls.password.value};
   this.loginService.login(credentials).subscribe(console.log);
  }

}
