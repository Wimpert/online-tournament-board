import { Team } from './../../../models/team.model';
import { MATCH_UPDATE_EVENT, MATCH_REMOVE_EVENT } from './../constants';
import { Match } from './../../../models/match.model';
import { Component, OnInit, Input, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'app-match-editor',
  templateUrl: './match-editor.component.html',
  styleUrls: ['./match-editor.component.scss']
})
export class MatchEditorComponent {

  @Input() match: Match;
  @Input() teamsInGroup: Team[];

  constructor(private element: ElementRef) { }

  matchChanged() {
    this.element.nativeElement.dispatchEvent(new CustomEvent(MATCH_UPDATE_EVENT, {bubbles: true, detail: this.match}));
  }

  deleteMatch() {
    this.element.nativeElement.dispatchEvent(new CustomEvent(MATCH_REMOVE_EVENT, {bubbles: true, detail: this.match}));
  }

  homeTeamOptionPickedHandler(team: Team) {
    const updatedMatch: Match = {
      ...this.match, homeTeam : {id: team.id} as Team
    };
    this.element.nativeElement.dispatchEvent(new CustomEvent(MATCH_UPDATE_EVENT, {bubbles: true, detail: updatedMatch}));
    this.match.homeTeam = team;
  }

  outTeamOptionPickedHandler(team: Team) {
    const updatedMatch: Match = {
      ...this.match, outTeam : {id: team.id} as Team
    };
    this.element.nativeElement.dispatchEvent(new CustomEvent(MATCH_UPDATE_EVENT, {bubbles: true, detail: updatedMatch}));
    this.match.outTeam = team;
  }

}
