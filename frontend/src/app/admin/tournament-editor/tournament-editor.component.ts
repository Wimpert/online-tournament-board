import { MATCH_UPDATE_EVENT_NAME } from './../constants';
import { Group } from './../../../models/group.model';
import { League } from './../../../models/league.model';
import { Match } from './../../../models/match.model';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tournament } from '../../../models/tournament.model';
import { TournamentService } from '../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap, debounceTime, shareReplay, share } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';

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
    fromEvent(this.element.nativeElement, MATCH_UPDATE_EVENT_NAME).pipe(
      debounceTime(1000),
      map((event: CustomEvent) => event.detail),
      switchMap( (match: Match) => this.tournamentService.updateMatch(match))
    ),
    this.addTeamToKnockoutRound.pipe(
      switchMap((leagueId: number) => this.tournamentService.addTeamsToKnockoutRound(leagueId))
    ),
    this.addGroupToLeague.pipe(
      switchMap((leagueId: number) => this.tournamentService.addGroup(leagueId))
    ),
    ).pipe(shareReplay());

    this.tournament$ = merge(this.tournamentUpdated$, this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => {
        if (id === undefined) {
          return this.tournamentService.createNew();

        }
        return this.tournamentService.findById(id);
      }),
      shareReplay()
      ));

      this.allMatches$ = this.tournament$.pipe(
        map((tournament: Tournament) => {
          return tournament.leagues.reduce((acc: Match[], league: League) => {
            league.groups.forEach((group: Group) => {
              group.matches.forEach(match => acc = [... acc, match]);
            });
            return acc;
          }, []);
        })
      );


  }

  tournamentChanged(event: string) {
    this.tournamentNamedChanged$.next(event);
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
