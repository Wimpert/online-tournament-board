import { MATCH_UPDATE_EVENT, GROUP_UPDATE_EVENT, ADD_TEAM_EVENT, TEAM_UPDATE_EVENT, REMOVE_TEAM_EVENT, REMOVE_GROUP_EVENT, ADD_MATCH_EVENT, MATCH_REMOVE_EVENT } from './../constants';
import { Group } from './../../../models/group.model';
import { League } from './../../../models/league.model';
import { Match } from './../../../models/match.model';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tournament } from '../../../models/tournament.model';
import { TournamentService } from '../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap, debounceTime, shareReplay, share, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { Team } from '../../../models/team.model';
import { group } from '@angular/animations';
import { Round } from '../../../models/round.model';

@Component({
  selector: 'app-tournament-editor',
  templateUrl: './tournament-editor.component.html',
  styleUrls: ['./tournament-editor.component.scss']
})
export class TournamentEditorComponent implements OnInit {

  tournament$: Observable<Tournament>;
  tournamentUpdated$: Observable<Tournament>;
  matchUpdated$: Observable<Tournament>;
  tournamentNamedChanged$: Subject<string> = new Subject<string>();
  tournamentDateChanged$: Subject<string> = new Subject<string>();
  tournamentId: number;
  allMatches$: Observable<Match[]>;

  addTeamToKnockoutRound: Subject<number> = new Subject<number>();
  addGroupToLeague: Subject<number> = new Subject<number>();

  constructor(private tournamentService: TournamentService, private route: ActivatedRoute, private element: ElementRef) { }

  ngOnInit() {

    this.tournamentUpdated$ = merge(this.tournamentNamedChanged$.pipe(
      debounceTime(300),
      switchMap(name => this.tournamentService.update({id: this.tournamentId, name: name}))
    ),
    this.tournamentDateChanged$.pipe(
      switchMap(date => this.tournamentService.update({id: this.tournamentId, startDateTime: date}))
    ),
    fromEvent(this.element.nativeElement, MATCH_UPDATE_EVENT).pipe(
      debounceTime(100),
      map((event: CustomEvent) => event.detail),
      switchMap( (match: Match) => this.tournamentService.updateMatch(match))
    ),
    this.addTeamToKnockoutRound.pipe(
      switchMap((leagueId: number) => this.tournamentService.addTeamsToKnockoutRound(leagueId))
    ),
    this.addGroupToLeague.pipe(
      switchMap((leagueId: number) => this.tournamentService.addGroup(leagueId))
    ),

    fromEvent(this.element.nativeElement, GROUP_UPDATE_EVENT).pipe(
      debounceTime(100),
      map((event: CustomEvent) => event.detail),
      switchMap( (group: Group) => this.tournamentService.updateGroup(group))
    ),
    fromEvent(this.element.nativeElement, ADD_TEAM_EVENT).pipe(
      map((event: CustomEvent) => event.detail),
      switchMap( (group: Group) => this.tournamentService.addTeam(group))
    ),

    fromEvent(this.element.nativeElement, TEAM_UPDATE_EVENT).pipe(
      debounceTime(100),
      map((event: CustomEvent) => event.detail),
      switchMap( (team: Team) => this.tournamentService.updateTeam(team))
    ),
    fromEvent(this.element.nativeElement, REMOVE_TEAM_EVENT).pipe(
      map((event: CustomEvent) => event.detail),
      switchMap( (teamId: number) => this.tournamentService.deleteTeam(teamId)),
      withLatestFrom(this.route.params.pipe(
        map(params => params['id']))),
      switchMap(([ _ , id]: [any, number]) => this.tournamentService.findById(`${id}`))
    ),
    fromEvent(this.element.nativeElement, REMOVE_GROUP_EVENT).pipe(
      map((event: CustomEvent) => event.detail),
      switchMap( (groupId: number) => this.tournamentService.deleteGroup(groupId)),
      withLatestFrom(this.route.params.pipe(
        map(params => params['id']))),
      switchMap(([ _ , id]: [any, number]) => this.tournamentService.findById(`${id}`))
    ),
    fromEvent(this.element.nativeElement, MATCH_REMOVE_EVENT).pipe(
      map((event: CustomEvent) => event.detail.id),
      switchMap( (matchId: number) => this.tournamentService.deleteMatch(matchId)),
      withLatestFrom(this.route.params.pipe(
        map(params => params['id']))),
      switchMap(([ _ , id]: [any, number]) => this.tournamentService.findById(`${id}`))

    ),
    fromEvent(this.element.nativeElement, ADD_MATCH_EVENT).pipe(
      map((event: CustomEvent) => event.detail),
      switchMap( (group: Group) => this.tournamentService.addMatch(group))
    )
    ).pipe(shareReplay());

    this.tournament$ = merge(this.tournamentUpdated$, this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => {
        if (id === undefined) {
          return this.tournamentService.createNew();

        }
        return this.tournamentService.findById(id);
      }),
      tap((tournament) => this.tournamentId = tournament.id),
      shareReplay()
      ));

      this.allMatches$ = this.tournament$.pipe(
        map((tournament: Tournament) => {
          return [...tournament.leagues.reduce((acc: Match[], league: League) => {
            league.groups.forEach((group: Group) => {
              group.matches.forEach(match => acc = [... acc, match]);
            });
            league.rounds.forEach((round: Round) => {
              round.matches.forEach(match => acc = [... acc, match]);
            });
            return acc;
          }, [])];
        }),
        shareReplay()
      );


  }

  tournamentNameChanged(event: string) {
    this.tournamentNamedChanged$.next(event);
  }

  tournamentDateChanged(event) {
    this.tournamentDateChanged$.next(event);
  }

 trackLeague(league: League) {
   return league.id;
 }


 handleAddTeamToKnockOutRoundEvent(league: League) {
   this.addTeamToKnockoutRound.next(league.id);
 }

 handleAddGroupToLeagueEvent(league: League) {
   this.addGroupToLeague.next(league.id);
 }


}
