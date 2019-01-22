import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class TournamentService {

  url = `${environment.baseUrl}/tournament`;

  constructor(private httpClient : HttpClient) {}

  findAllForUser(){
    return this.httpClient.get(`${this.url}`,{withCredentials:true});
  }



}
