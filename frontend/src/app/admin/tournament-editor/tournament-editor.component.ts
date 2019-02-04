import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tournament } from '../../../models/tournament.model';
import { TournamentService } from '../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';

@Component({
  selector: 'app-tournament-editor',
  templateUrl: './tournament-editor.component.html',
  styleUrls: ['./tournament-editor.component.scss']
})
export class TournamentEditorComponent implements OnInit {

  tournament$ : Observable<Tournament>;
  tournamentUpdated$ : Observable<Tournament>;
  tournamentNamedChanged$ : Subject<string> = new Subject<string>();
  tournamentId : number;

  constructor(private tournamentService: TournamentService, private route: ActivatedRoute, private element : ElementRef) { }

  ngOnInit() {

    this.tournamentUpdated$ = this.tournamentNamedChanged$.pipe(
      debounceTime(300),
      switchMap(name => this.tournamentService.update({id:this.tournamentId, name: name}))
    );

    this.tournament$ = merge(this.tournamentUpdated$,this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => {
        if(id === undefined){
          return this.tournamentService.createNew();

        }
        return this.tournamentService.findById(id);
      }),
      tap( tournament => this.tournamentId = tournament.id)
      ));


  }

  tournamentChanged(event: string){
    this.tournamentNamedChanged$.next(event);
  }



}
