import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SignUpComponent, LoginComponent],
  providers: [UserService, LoginService]
})
export class UsersModule { }
