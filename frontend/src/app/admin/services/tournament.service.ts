import { Group } from './../../../models/group.model';
import { Team } from './../../../models/team.model';
import { Match } from './../../../models/match.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Tournament } from '../../../models/tournament.model';
import { group } from '@angular/animations';
import { share, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TournamentService {

  url = `${environment.baseUrl}/tournament`;

  allReferees: {name: string, id: number}[];
  allReferees$: Observable<{name: string, id: number}[]>;
  allTeams: Team[];
  allTeams$: Observable<Team[]>;

  constructor(private httpClient: HttpClient) {}

  findAllForUser() {
    return this.httpClient.get(`${this.url}/all`, {withCredentials: true});
  }

  findById(id: string):  Observable<Tournament> {
    return this.httpClient.get<Tournament>(`${this.url}/${id}`, {withCredentials: true});
  }

  createNew():  Observable<Tournament> {
    return this.httpClient.post<Tournament>(this.url, undefined, {withCredentials: true});
  }

  update(tournament: any): Observable<Tournament> {
    return this.httpClient.put<Tournament>(this.url, tournament, {withCredentials: true});
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${id}`, {withCredentials: true});
  }

  deleteTeam(teamId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/team/${teamId}`, {withCredentials: true});
  }

  deleteGroup(groupId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/group/${groupId}`, {withCredentials: true});
  }

  deleteMatch(matchId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/match/${matchId}`, {withCredentials: true});
  }

  getNewTournament() {
    const tournament = new Tournament();

  }

  updateMatch(match: Match): Observable<Tournament> {
    return this.httpClient.put<Tournament>(`${this.url}/match`, match , {withCredentials: true});
  }

  updateGroup(group: Group): Observable<Tournament> {
    return this.httpClient.put<Tournament>(`${this.url}/group`, group , {withCredentials: true});
  }

  updateTeam(team: Team): Observable<Tournament> {
    return this.httpClient.put<Tournament>(`${this.url}/team`, team , {withCredentials: true});
  }

  addTeam(group: Group): Observable<Tournament> {
    return this.httpClient.post<Tournament>(`${this.url}/addTeam/groupId/${group.id}`, undefined , {withCredentials: true});
  }

  addMatch(group: Group): Observable<Tournament> {
    return this.httpClient.post<Tournament>(`${this.url}/addMatch/groupId/${group.id}`, undefined , {withCredentials: true});
  }

  addTeamsToKnockoutRound(leagueId: number) {
    return this.httpClient.put<Tournament>(`${this.url}/addToKnockoutRound/${leagueId}`, undefined , {withCredentials: true});
  }

  addGroup(leagueId: number) {
    return this.httpClient.post<Tournament>(`${this.url}/addGroup/leagueId/${leagueId}`, undefined, {withCredentials: true});
  }

  findAllReferees(): Observable<{id: number, name: string}[]> {

    if (this.allReferees) {
      return of(this.allReferees);
    } else if (this.allReferees$) {
      return this.allReferees$;
    } else {
      this.allReferees$ = this.httpClient.get<{id: number, name: string}[]>(`${this.url}/referee/all`, {withCredentials: true}).pipe(
        tap(data => this.allReferees = data),
        tap(data => this.allReferees$ = undefined),
        share()
      );
      return this.allReferees$;
    }
  }

  findAllTeams(leagueId: number): Observable<Team[]> {

    if (this.allTeams$) {
      return of(this.allTeams);
    } else if (this.allTeams$) {
      return this.allTeams$;
    } else {
      this.allTeams$ = this.httpClient.get<Team[]>(`${this.url}/team/all/${leagueId}`, {withCredentials: true}).pipe(
        tap(data => this.allTeams = data),
        tap(data => this.allTeams$ = undefined),
        share()
      );
      return this.allTeams$;
    }
  }

  compareTeams(teama: Team, teamb: Team): number {

    if (teama.points !== teamb.points) {
        // compare on points:
        return teamb.points - teama.points;
    } else if (teama.matchesWon !== teamb.matchesWon) {
        // on matchesWon :
        return teamb.matchesWon - teama.matchesWon;
    } else if (teama.goalsScored !== teamb.goalsScored) {
        // on goals scored:
        return teamb.goalsScored - teama.goalsScored;
    } else if (teama.goalsConcieved !== teamb.goalsConcieved) {
        // compare on goal diff:
        return teamb.goalsConcieved - teama.goalsConcieved;
    }  else if (teama.internalIndex !== teamb.internalIndex) {
        // compare on goal diff:
        return teamb.internalIndex - teama.internalIndex;
    }
    return 0;
}






/*
  Winner 1 v. Winner 3 = A
  Winner 2 v. Winner 4 = B
  Winner 5 v. Winner 7 = C
  Winner 6 v. Winner 8 = D
  Semies:
  Winner 1 v. Winner 3
  Winner 2 v. Winner 4
*/
// addToNextKnockoutRound(tournament: Tournament, roundIndex: number, matchIndex: number , winningTeam: string) {

//   if (roundIndex == 3) {
//      // this is the final
//       return;
//   }

//   let matchIndexToAddTo;
//   let homeTeam = true;
//   if (roundIndex == 0) {
//       if (matchIndex == 0 || matchIndex == 2) {
//           matchIndexToAddTo = 0;
//       } else if (matchIndex == 1 || matchIndex == 3) {
//           matchIndexToAddTo = 1;
//       } else if (matchIndex == 4 || matchIndex == 6) {
//           matchIndexToAddTo = 2;
//       } else if (matchIndex == 5 || matchIndex == 7) {
//           matchIndexToAddTo = 3;
//       }
//       if (matchIndex == 2 || matchIndex == 3 || matchIndex == 6 || matchIndex == 7) {
//           homeTeam = false;
//       }
//   } else if (roundIndex == 1) {
//       if (matchIndex == 0 || matchIndex == 2) {
//           matchIndexToAddTo = 0;
//       } else {
//           matchIndexToAddTo = 1;
//       }

//       if (matchIndex == 2 || matchIndex == 3) {
//           homeTeam = false;
//       }
//   } else {
//       matchIndexToAddTo = 0;
//       if (matchIndex == 1) {
//           homeTeam = false;
//       }
//   }
//   const matchToAddTo = tournament.rounds[roundIndex + 1].matches[matchIndexToAddTo];
//   if (homeTeam) {
//       matchToAddTo.homeTeamName = winningTeam;
//   } else {
//       matchToAddTo.outTeamName = winningTeam;
//   }
// }

  }

