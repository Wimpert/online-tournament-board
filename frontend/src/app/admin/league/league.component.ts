import { League } from './../../../models/league.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  @Input() league: League;

  constructor() { }

  ngOnInit() {
  }

}
