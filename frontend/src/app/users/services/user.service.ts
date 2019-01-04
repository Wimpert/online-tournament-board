import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  url = environment.baseUrl+'/user'

  constructor(private httpClient: HttpClient) {}

  createUser(user){
    console.log(user.firstName);
  }

}
