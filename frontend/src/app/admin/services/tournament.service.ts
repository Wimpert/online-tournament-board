import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Tournament } from '../../../models/tournament.model';

@Injectable()
export class TournamentService {

  url = `${environment.baseUrl}/tournament`;

  constructor(private httpClient : HttpClient) {}

  findAllForUser(){
    return this.httpClient.get(`${this.url}/all`,{withCredentials:true});
  }

  findById(id: string) :  Observable<Tournament>{
    return this.httpClient.get<Tournament>(`${this.url}/${id}`,{withCredentials:true});
  }

  createNew() :  Observable<Tournament>{
    return this.httpClient.post<Tournament>(this.url,undefined,{withCredentials:true});
  }

  update(tournament : any) : Observable<Tournament>{
    return this.httpClient.put<Tournament>(this.url,tournament,{withCredentials:true});
  }

  delete(id : any) : Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${id}`,{withCredentials:true});
  }

  getNewTournament(){
    const tournament = new Tournament()

  }

  }

