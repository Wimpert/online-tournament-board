import { Team } from './../../../models/team.model';

import { League } from './../../../models/league.model';
import { Group } from './../../../models/group.model';
import { Component, Input, ElementRef, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { REMOVE_GROUP_EVENT } from '../constants';
import { Observable } from 'rxjs/Observable';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-league-editor',
  templateUrl: './league-editor.component.html',
  styleUrls: ['./league-editor.component.scss']
})
export class LeagueEditorComponent implements OnInit {

  @Input() league: any;
  @Output() addTeamsToKnockRound: EventEmitter<League> = new EventEmitter<League>();
  @Output() addGroup: EventEmitter<League> = new EventEmitter<League>();

  teamsInLeague$: Observable<Team[]>;


  @HostListener(REMOVE_GROUP_EVENT, ['$event'])
  onUnSelect(event: CustomEvent) {
    const groupId = event.detail;
    this.league = {... this.league, groups : [...this.league.groups.filter((group: Group) => group.id !== groupId)]};
  }

  constructor(private element: ElementRef, private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.teamsInLeague$ = this.tournamentService.findAllTeams(this.league.id);
  }


  leagueChanged(event) {
    this.league.name = event;
    this.element.nativeElement.dispatchEvent(new CustomEvent('tour-changed', {bubbles: true}));
  }


  track(item: {id: number}) {
    return item.id;
  }

  addToNextRound() {
    this.addTeamsToKnockRound.emit(this.league);
  }

  addGroupHandler(event: MouseEvent) {
    event.stopPropagation();
    this.addGroup.emit(this.league);
  }

  addMatchHandler(event: MouseEvent) {
    event.stopPropagation();
    this.addGroup.emit(this.league);
  }



}
