import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TournamentService } from '../services/tournament.service';
import { Subject } from 'rxjs/Subject';
import { combineLatest, switchMap, tap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  tournaments$ :  Observable<any>
  deleteTournament$ : Subject<number> = new Subject<number>();

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournaments$ = this.deleteTournament$.pipe(
        tap(console.log),
        switchMap(id => this.tournamentService.delete(id)),
        switchMap(deleted => this.tournamentService.findAllForUser()),
        startWith(undefined),
        switchMap(_ =>  this.tournamentService.findAllForUser())
    );
  }

  delete(id:  number){
    this.deleteTournament$.next(id);
  }

}
