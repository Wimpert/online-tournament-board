import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  url = environment.baseUrl+'/user'

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(this.url, user);
  }

}
