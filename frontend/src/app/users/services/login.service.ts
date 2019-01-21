import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {


  url = environment
  .baseUrl+'/login'

  constructor(private httpClient: HttpClient) {}

  login(credentials: {username: string, password: string}): Observable<any>{
    return this.httpClient.post(this.url, credentials, {withCredentials:true});
  }

}
