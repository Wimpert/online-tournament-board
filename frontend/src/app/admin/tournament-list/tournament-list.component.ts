import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  tournaments$ :  Observable<any>

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournaments$ = this.tournamentService.findAllForUser();
  }

}
