import { TournamentService } from './../services/tournament.service';
import { Match } from './../../../models/match.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-quick-match-editor',
  templateUrl: './quick-match-editor.component.html',
  styleUrls: ['./quick-match-editor.component.scss']
})
export class QuickMatchEditorComponent implements OnInit {

  @Input() allMatches : Match[];

  match$ : Observable<Match>;
  matchNumberChanged$ : Subject<number> = new Subject<number>();
  matchNumber : number;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {

    this.match$ = this.matchNumberChanged$.pipe(
      map((matchNumber) => this.allMatches.find(match => match.matchNr === Number(matchNumber)))
    )
  }

  findMatch(){
    this.matchNumberChanged$.next(this.matchNumber)
  }

}
