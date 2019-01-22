import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../services/login.service';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { takeUntil, startWith, filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy{

  destroy$ : Subject<void> =  new Subject<void>();

  loginForm = this.formBuilder.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }
  );

  constructor(private loginService : LoginService, private formBuilder : FormBuilder, private router: Router) { }

  login() {
    const credentials = {username: this.loginForm.controls.username.value, password: this.loginForm.controls.password.value};
    this.loginService.login(credentials).pipe(
      takeUntil(this.destroy$),
    ).subscribe((resp) => {this.router.navigate(['/admin']);});
  }

  ngOnDestroy(){
    this.destroy$.next();
  }

}
