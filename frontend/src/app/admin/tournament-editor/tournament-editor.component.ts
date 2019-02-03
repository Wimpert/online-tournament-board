import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tournament } from '../../../models/tournament.model';
import { TournamentService } from '../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
  selector: 'app-tournament-editor',
  templateUrl: './tournament-editor.component.html',
  styleUrls: ['./tournament-editor.component.scss']
})
export class TournamentEditorComponent implements OnInit {

  tournament$ : Observable<Tournament>;

  constructor(private tournamentService: TournamentService, private route: ActivatedRoute, private element : ElementRef) { }

  ngOnInit() {
    this.tournament$ = this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => {
        if(id === undefined){
          return of(new Tournament());

        }
        return this.tournamentService.findById(id);
      })
      );

      fromEvent(this.element.nativeElement,'tour-changed').subscribe(
        _ => console.log(_)
      );

  }



}
